import React, { useState, memo } from 'react';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const SearchBar = memo(({ onSearch }) => {
  console.log('SearchBar rendering');
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  return highlightUpdates(
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
