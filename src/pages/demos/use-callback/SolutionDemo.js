import React, { useState, useCallback } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

const SolutionDemo = () => {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('None');
  
  // Create stable function references using useCallback
  const handleUpdateA = useCallback(() => {
    setCount(c => c + 1);
    setLastUpdated('Component A');
  }, []); // Empty dependency array = function reference never changes
  
  const handleUpdateB = useCallback(() => {
    setCount(c => c + 1);
    setLastUpdated('Component B');
  }, []);
  
  const handleUpdateC = useCallback(() => {
    setCount(c => c + 1);
    setLastUpdated('Component C');
  }, []);
  
  return (
    <div className={styles.demoSection}>
      <h2>Solution: Using useCallback</h2>
      <p>
        useCallback creates a stable function reference that doesn't change between renders,
        allowing React.memo to prevent unnecessary re-renders.
      </p>
      
      <div className={styles.demoContainer}>
        <div className={styles.parentInfo}>
          <h3>Parent State</h3>
          <p>Count: {count}</p>
          <p>Last Updated By: {lastUpdated}</p>
        </div>
        
        <div className={styles.componentsContainer}>
          {/* These won't re-render when parent renders because function references are stable */}
          <ExpensiveComponent 
            label="Component A"
            onUpdate={handleUpdateA}
          />
          <ExpensiveComponent 
            label="Component B"
            onUpdate={handleUpdateB}
          />
          <ExpensiveComponent 
            label="Component C"
            onUpdate={handleUpdateC}
          />
        </div>
        
        <CodeHighlight code={`// Solution: Stable function references with useCallback
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('None');

  // Create stable function references
  const handleUpdateA = useCallback(() => {
    setCount(c => c + 1);
    setLastUpdated('Component A');
  }, []); // Empty deps = never changes
  
  const handleUpdateB = useCallback(() => {
    setCount(c => c + 1);
    setLastUpdated('Component B');
  }, []);

  return (
    <>
      {/* These functions maintain the same reference */}
      <ExpensiveComponent 
        label="Component A"
        onUpdate={handleUpdateA}
      />
      <ExpensiveComponent 
        label="Component B"
        onUpdate={handleUpdateB}
      />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Now when you click any component's button, only that component re-renders.
            This is because useCallback maintains the same function reference between renders,
            so React.memo's comparison sees that the props haven't changed.
          </p>
          <p>
            Watch the border highlight effect - only the clicked component will highlight,
            showing that the other components are properly memoized and avoid unnecessary
            re-renders.
          </p>
          <p>
            <strong>How it works:</strong> useCallback creates a function that only changes
            when its dependencies change. With an empty dependency array, the function reference
            stays the same forever, allowing React.memo to work effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDemo;
