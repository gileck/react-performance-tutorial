import React, { useState } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

const ProblemDemo = () => {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('None');
  
  return (
    <div className={styles.demoSection}>
      <h2>Problem: Inline Functions Cause Re-renders</h2>
      <p>
        Even with React.memo, components will re-render if they receive new function props
        on every render. This happens with inline functions because they create new references
        each time.
      </p>
      
      <div className={styles.demoContainer}>
        <div className={styles.parentInfo}>
          <h3>Parent State</h3>
          <p>Count: {count}</p>
          <p>Last Updated By: {lastUpdated}</p>
        </div>
        
        <div className={styles.componentsContainer}>
          {/* These will re-render on every parent render despite using React.memo */}
          <ExpensiveComponent 
            label="Component A"
            onUpdate={() => {
              setCount(c => c + 1);
              setLastUpdated('Component A');
            }}
          />
          <ExpensiveComponent 
            label="Component B"
            onUpdate={() => {
              setCount(c => c + 1);
              setLastUpdated('Component B');
            }}
          />
          <ExpensiveComponent 
            label="Component C"
            onUpdate={() => {
              setCount(c => c + 1);
              setLastUpdated('Component C');
            }}
          />
        </div>
        
        <CodeHighlight code={`// Problem: New function references on every render
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('None');

  return (
    <>
      {/* These create new function references every time */}
      <ExpensiveComponent 
        label="Component A"
        onUpdate={() => {
          setCount(c => c + 1);
          setLastUpdated('Component A');
        }}
      />
      <ExpensiveComponent 
        label="Component B"
        onUpdate={() => {
          setCount(c => c + 1);
          setLastUpdated('Component B');
        }}
      />
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Even though we're using React.memo on ExpensiveComponent, it still re-renders
            every time the parent renders. This happens because the inline arrow functions
            passed to onUpdate are recreated on every render, creating new references.
          </p>
          <p>
            React.memo's shallow comparison sees these new function references as different props,
            so it can't prevent the re-renders. Watch the border highlight effect - all components
            will highlight when any one of them is clicked, showing they're all re-rendering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
