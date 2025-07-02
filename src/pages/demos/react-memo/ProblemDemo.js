import React, { useState, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Problem demonstration
const ProblemDemo = () => {
  const [count, setCount] = useState(0);
  const renderKey = useRef(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
    renderKey.current += 1;
  };
  
  return (
    <div className={styles.demoSection}>
      <h2>Problem: Unnecessary Re-renders</h2>
      <p>
        When the parent component re-renders, all child components re-render too, 
        even if their props didn't change.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={handleIncrement}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          <ExpensiveComponent label="Component A" key={`a-${renderKey.current}`} />
          <ExpensiveComponent label="Component B" key={`b-${renderKey.current}`} />
        </div>
        
        <CodeHighlight code={`function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These re-render when parent re-renders */}
      <ExpensiveComponent label="Component A" />
      <ExpensiveComponent label="Component B" />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <p>
            <strong>What's happening?</strong> Every button click causes all child components 
            to re-render unnecessarily. Watch the blue border highlight when components render.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
