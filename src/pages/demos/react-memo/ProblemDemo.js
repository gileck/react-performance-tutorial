import React, { useState, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Problem demonstration
const ProblemDemo = () => {
  const [count, setCount] = useState(0);
  // Create a key that changes on each render to force re-render of children
  const renderKey = useRef(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
    // Increment the key to force re-render of all children
    renderKey.current += 1;
  };
  
  return (
    <div className={styles.demoSection}>
      <h2>Problem: Unnecessary Re-renders</h2>
      <p>
        When the parent component re-renders (by clicking the button below), 
        all child components re-render too, even if their props didn't change.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={handleIncrement}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          {/* Force re-render by using key */}
          <ExpensiveComponent label="Component A" key={`a-${renderKey.current}`} />
          <ExpensiveComponent label="Component B" key={`b-${renderKey.current}`} />
          <ExpensiveComponent label="Component C" key={`c-${renderKey.current}`} />
        </div>
        
        <CodeHighlight code={`// Parent component re-renders when state changes
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* Child components re-render when parent re-renders */}
      <ExpensiveComponent label="Component A" />
      <ExpensiveComponent label="Component B" />
      <ExpensiveComponent label="Component C" />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Every time you click the button, the parent component re-renders, causing all three
            ExpensiveComponent instances to re-render unnecessarily, even though their props
            (the labels) haven't changed.
          </p>
          <p>
            Check the browser console to see all the render logs and watch the border highlight effect.
            Components that re-render will briefly show a blue border.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
