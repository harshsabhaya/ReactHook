import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onFilterChange } = props
  const [enteredFilterData, setEnteredFilterData] = useState('')
  const inputRef = useRef()

  const query = 
    enteredFilterData.length === 0 
      ? '' 
      : `?orderBy="title"&equalTo="${enteredFilterData}"`;

  useEffect(() => {
    const timer = setTimeout(() =>{
      if (enteredFilterData === inputRef.current.value) {
        fetch('https://react-hook-7031f.firebaseio.com/ingredients.json' + query)
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
          onFilterChange(loadingIngredients) 
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [enteredFilterData, onFilterChange ])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            ref={inputRef}
            type="text" 
            value={enteredFilterData} 
            onChange={event => setEnteredFilterData(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
