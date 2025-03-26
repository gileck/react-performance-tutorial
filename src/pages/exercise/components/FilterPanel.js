import React, { useState, memo } from 'react';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const FilterPanel = memo(({ options, onFilterChange }) => {
  console.log('FilterPanel rendering');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(options.priceRange);
  const [inStock, setInStock] = useState(options.inStock);
  
  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onFilterChange({
      categories: newCategories,
      priceRange,
      inStock
    });
  };
  
  const handlePriceChange = (event, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(event.target.value, 10);
    
    setPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange,
      inStock
    });
  };
  
  const handleInStockChange = (event) => {
    const newInStock = event.target.checked;
    
    setInStock(newInStock);
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      inStock: newInStock
    });
  };
  
  return highlightUpdates(
    <div className={styles.filterPanel}>
      <h3>Filters</h3>
      
      <div className={styles.filterSection}>
        <h4>Categories</h4>
        <div className={styles.categories}>
          {options.categories.map(category => (
            <label key={category} className={styles.categoryCheckbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      
      <div className={styles.filterSection}>
        <h4>Price Range</h4>
        <div className={styles.priceRange}>
          <div className={styles.priceInputs}>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
            />
            <span>to</span>
            <input
              type="number"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.filterSection}>
        <h4>Availability</h4>
        <label className={styles.inStockCheckbox}>
          <input
            type="checkbox"
            checked={inStock}
            onChange={handleInStockChange}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;
