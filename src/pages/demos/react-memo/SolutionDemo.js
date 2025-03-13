import React, { useState, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Solution demonstration
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
const SolutionDemo = () => {
  const [count, setCount] = useState(0);
  // Create a key that changes on each render to force re-render of parent
  const renderKey = useRef(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
    // Increment the key to force re-render of parent
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
          {/* The key doesn't change for each component, so they won't re-render if memoized */}
          <MemoizedExpensiveComponent label="Memoized Component A" key="memo-a" />
          <MemoizedExpensiveComponent label="Memoized Component B" key="memo-b" />
          <MemoizedExpensiveComponent label="Memoized Component C" key="memo-c" />
        </div>
        
        <CodeHighlight code={`// Create a memoized version of the component
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
      <MemoizedExpensiveComponent label="Component C" />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            When you click the button, only the parent component re-renders. The memoized components
            don't re-render because their props haven't changed.
          </p>
          <p>
            Check the browser console - you'll notice the memoized components only render once,
            not on every button click. Notice how the border highlight only appears on the initial render.
          </p>
          <p>
            <strong>How it works:</strong> React.memo performs a shallow comparison of props. If the props
            haven't changed, React skips rendering the component and reuses the last rendered result.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDemo;
