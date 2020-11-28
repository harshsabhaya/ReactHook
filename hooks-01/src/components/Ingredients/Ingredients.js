import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredient, setUserIngredient] = useState([])

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
    fetch('https://react-hook-7031f.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'COntent-Type': 'application/json'}
    })
    .then(responce => {
      return responce.json()
    })
    .then(responceData => {
      setUserIngredient([...userIngredient, { id: responceData.name, ...ingredient}])
    })
  }

  return (
    <div className="App">
      <IngredientForm  onIngredientChange={addIngredientHandler}/>

      <section>
        <Search onFilterChange={filterChabgedHandler}/>
        <IngredientList ingredients={userIngredient} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
