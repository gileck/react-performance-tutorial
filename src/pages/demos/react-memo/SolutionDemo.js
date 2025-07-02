import React, { useState, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Solution demonstration
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
const SolutionDemo = () => {
  const [count, setCount] = useState(0);
  const renderKey = useRef(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
    renderKey.current += 1;
  };
  
  return (
    <div className={styles.demoSection}>
      <h2>Solution: Using React.memo</h2>
      <p>
        React.memo prevents components from re-rendering when their props haven't changed.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={handleIncrement}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          <MemoizedExpensiveComponent label="Memoized Component A" key="memo-a" />
          <MemoizedExpensiveComponent label="Memoized Component B" key="memo-b" />
        </div>
        
        <CodeHighlight code={`// Create a memoized version
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These won't re-render when parent re-renders */}
      <MemoizedExpensiveComponent label="Component A" />
      <MemoizedExpensiveComponent label="Component B" />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <p>
            <strong>What's happening?</strong> Only the parent re-renders when you click the button. 
            The memoized components skip re-rendering because their props haven't changed.
          </p>
          <p>
            <strong>How it works:</strong> React.memo performs a shallow comparison of props. 
            If unchanged, React reuses the last rendered result.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDemo;
