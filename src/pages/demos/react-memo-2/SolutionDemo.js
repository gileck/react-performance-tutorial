import React, { useState, useRef, useMemo } from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import CodeHighlight from '@/components/CodeHighlight';

// Create a memoized version of ExpensiveComponent
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);

// Solution demonstration - proper use of objects with React.memo
const SolutionDemo = () => {
  const [count, setCount] = useState(0);
  
  // Define stable object references using useMemo
  const configA = useMemo(() => ({
    label: "Memoized Component A", 
    color: "#ff5252",
    description: "I receive a memoized object prop that maintains the same reference"
  }), []); // Empty dependency array means this object is created once
  
  const configB = useMemo(() => ({
    label: "Memoized Component B", 
    color: "#4caf50",
    description: "My object prop is stable across renders thanks to useMemo"
  }), []);
  
  const configC = useMemo(() => ({
    label: "Memoized Component C", 
    color: "#2196f3",
    description: "React.memo works correctly with stable object references"
  }), []);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div className={styles.demoSection}>
      <h2>Solution: Stable Object References</h2>
      <p>
        To make React.memo work with object props, we need to ensure the objects maintain
        the same reference across renders using useMemo or by defining them outside the component.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={handleIncrement}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          {/* These won't re-render because their props maintain the same reference */}
          <MemoizedExpensiveComponent config={configA} key="solution-a" />
          <MemoizedExpensiveComponent config={configB} key="solution-b" />
          <MemoizedExpensiveComponent config={configC} key="solution-c" />
        </div>
        
        <CodeHighlight code={`// Create a memoized version of the component
const MemoizedComponent = React.memo(ExpensiveComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Create stable object references with useMemo
  const configA = useMemo(() => ({
    label: "Component A",
    color: "red"
  }), []); // Empty dependency array = create once
  
  const configB = useMemo(() => ({
    label: "Component B",
    color: "green"
  }), []);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These WON'T re-render when parent re-renders */}
      <MemoizedComponent config={configA} />
      <MemoizedComponent config={configB} />
      
      {/* Object references stay the same across renders */}
      {/* React.memo's comparison now works correctly */}
    </>
  );
}`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Now, when you click the button, the memoized components don't re-render because their props
            maintain the same reference across renders.
          </p>
          <p>
            We're using <code>useMemo</code> to create stable object references that don't change when
            the parent component re-renders. This allows React.memo to correctly determine that the props
            haven't changed.
          </p>
          <p>
            Watch the border highlight effect - none of the components will highlight when you click the button,
            showing they're not re-rendering. This is a significant performance improvement!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDemo;
