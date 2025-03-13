import React, { useState, useEffect } from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices</h2>
      <ul>
        <li>
          <strong>Don't overuse React.memo</strong> - Only apply it to components that would benefit from memoization
          <CodeHighlight code={`// Only memoize components that render often or are expensive
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);

// Don't memoize simple components that rarely re-render
const SimpleComponent = () => <div>Hello World</div>;`} />
        </li>
        <li>
          <strong>Custom comparison function</strong> - You can provide a custom comparison function 
          as a second parameter to React.memo
          <CodeHighlight code={`// Custom comparison function
const MemoizedComponent = React.memo(
  MyComponent,
  (prevProps, nextProps) => {
    // Only re-render if id changes, ignore other prop changes
    return prevProps.id === nextProps.id;
  }
);`} />
        </li>
        <li>
          <strong>API Data and Memoization</strong> - When fetching data, new object references can cause unnecessary re-renders even if the data hasn't changed
          <CodeHighlight code={`// Problem: New API call creates new object references
const ProductGallery = () => {
  const [selectedSizes, setSelectedSizes] = useState(['S']);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This causes ALL products to re-render even if they didn't change
    fetchProducts(selectedSizes).then(setProducts);
  }, [selectedSizes]);

  return (
    <div>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

// Solution: Use custom comparison in React.memo
const Product = React.memo(
  ({ product }) => (
    <div>
      <h3>{product.name}</h3>
      <p>Size: {product.size}</p>
    </div>
  ),
  // Only re-render if the product data actually changed
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.size === nextProps.product.size
    );
  }
);`} />
        </li>
      </ul>
    </div>
  );
};

export default BestPractices;
