import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import ProductCard from './ProductCard';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const ProductList = ({ searchTerm, filters }) => {
  console.log('ProductList rendering');
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter products based on search term and filters
  useEffect(() => {
    if (!products.length) return;
    
    // Apply filters
    let result = [...products];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // In stock filter
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    setFilteredProducts(result.map(product => ({
      ...product,
      lastUpdated: new Date().toISOString()
    })));
  }, [products, searchTerm, filters]);
  
  return highlightUpdates(
    <div className={styles.productList}>
      <h2>Products ({filteredProducts.length})</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
