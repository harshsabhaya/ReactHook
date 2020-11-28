import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onFilterChange } = props
  const [enteredFilterData, setEnteredFilterData] = useState('')

  const query = 
    enteredFilterData.length === 0 
      ? '' 
      : `?orderBy="title"&equalTo="${enteredFilterData}"`;
  console.log('query', query);
  useEffect(() => {
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
    
  }, [enteredFilterData, onFilterChange ])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilterData} onChange={event => setEnteredFilterData(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
