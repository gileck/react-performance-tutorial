import React from 'react';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const ProductCard = ({ product }) => {
  console.log(`ProductCard rendering: ${product.name}`);
  
  // Simulate expensive rendering
  const start = performance.now();
  while (performance.now() - start < 5) {
    // Artificial delay to simulate expensive rendering
  }
  
  return highlightUpdates(
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <div className={styles.placeholderImage} style={{ backgroundColor: getColorFromName(product.name) }}>
          {product.name.substring(0, 2)}
        </div>
      </div>
      <div className={styles.productDetails}>
        <h3>{product.name}</h3>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.stockStatus}>
          {product.inStock ? (
            <span className={styles.inStock}>In Stock</span>
          ) : (
            <span className={styles.outOfStock}>Out of Stock</span>
          )}
        </p>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

// Helper function to generate a color from product name
function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}

export default ProductCard;
