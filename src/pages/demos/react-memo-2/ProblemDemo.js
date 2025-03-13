import React, { useState, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Problem demonstration - inline objects with React.memo
const ProblemDemo = () => {
  const [count, setCount] = useState(0);
  
  // Create a memoized version of ExpensiveComponent
  const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div className={styles.demoSection}>
      <h2>Problem: Inline Objects with React.memo</h2>
      <p>
        Even though we're using React.memo, components will still re-render when 
        passing inline object props, because React.memo performs shallow comparison.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={handleIncrement}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          {/* These will re-render on every parent render despite using React.memo */}
          <MemoizedExpensiveComponent 
            config={{ 
              label: "Memoized Component A", 
              color: "#ff5252",
              description: "I receive an inline object prop that's recreated on every render"
            }} 
            key="problem-a" 
          />
          <MemoizedExpensiveComponent 
            config={{ 
              label: "Memoized Component B", 
              color: "#4caf50",
              description: "Even with React.memo, I'll re-render because my object prop is different on every render"
            }} 
            key="problem-b" 
          />
          <MemoizedExpensiveComponent 
            config={{ 
              label: "Memoized Component C", 
              color: "#2196f3",
              description: "Shallow comparison sees my object prop as new each time"
            }} 
            key="problem-c" 
          />
        </div>
        
        <CodeHighlight code={`// Even with React.memo, this won't work as expected
const MemoizedComponent = React.memo(ExpensiveComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These WILL re-render despite React.memo! */}
      <MemoizedComponent 
        config={{ label: "Component A", color: "red" }} 
      />
      <MemoizedComponent 
        config={{ label: "Component B", color: "green" }} 
      />
      
      {/* New object references are created on every render */}
      {/* React.memo's shallow comparison sees these as new props */}
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Even though we've wrapped our components with React.memo, they still re-render when the parent renders.
            This happens because we're passing inline object props that are recreated on every render.
          </p>
          <p>
            React.memo performs a shallow comparison of props, and since <code>{`{ label: "..." }`}</code> creates a new
            object reference each time, the comparison returns false and the component re-renders.
          </p>
          <p>
            Watch the border highlight effect - all components will highlight on every button click,
            showing they're all re-rendering despite being wrapped with React.memo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
