import React, { useState, useEffect, useCallback } from 'react';
import ErrorModal from '../UI/ErrorModal';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredient, setUserIngredient] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    fetch('https://react-hook-7031f.firebaseio.com/ingredients.json')
    .then(responce => responce.json())
    .then(responseData => {
      const loadingIngredients = [];
      for (const key in responseData) {
        // console.log('responseData', responseData);
        loadingIngredients.push({
          id : key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredient(loadingIngredients)
    })
  }, [])

  useEffect(() => {
    console.log('userIngredient', userIngredient);
  },[])

  const filterChabgedHandler = useCallback((filterIngredient) => {
    setUserIngredient(filterIngredient)
    console.log('filterIngredient', filterIngredient);
  }, [])

  const addIngredientHandler = ingredient => {
    setLoading(true)
    fetch('https://react-hook-7031f.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'COntent-Type': 'application/json'}
    })
      .then(responce => {
      setLoading(false)
      return responce.json()
    })
    .then(responceData => {
      setUserIngredient([...userIngredient, { id: responceData.name, ...ingredient}])
    })
    .catch(error => {
      setError(error.message)
      setLoading(false)
    })
  }

  const removeIngredientHandler = ingredientId => {
    setLoading(true)
    fetch(`https://react-hook-7031f.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
    .then(responce => {
    setLoading(false)
    setUserIngredient(prevIngredients => 
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId ))
    })
    .catch(error => {
      setError(error.message)
      setLoading(false)
    })
  }
  
  const closeError = () => {
    setError(false)
  }
  console.log('msg print');
  return (
    <div className="App">
      {error && <ErrorModal onClose={closeError}>{ error }</ErrorModal>}
      <IngredientForm onIngredientChange={addIngredientHandler} loading={ isLoading }/>

      <section>
        <Search onFilterChange={filterChabgedHandler}/>
        <IngredientList ingredients={userIngredient} onRemoveItem={(id) => removeIngredientHandler(id)}/>
      </section>
    </div>
  );
}

export default Ingredients;
