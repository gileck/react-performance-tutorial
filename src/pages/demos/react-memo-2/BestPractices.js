import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices for React.memo with Objects</h2>
      <ul>
        <li>
          <strong>Use useMemo for object props</strong> - Wrap object props with useMemo to maintain stable references
          <CodeHighlight code={`const config = useMemo(() => ({ 
  label: "Component A",
  color: "red" 
}), []); // Empty dependency array = create once

<MemoizedComponent config={config} />`} />
        </li>
        <li>
          <strong>Define objects outside the render function</strong> - For static objects, define them outside your component
          <CodeHighlight code={`// Outside component
const STATIC_CONFIG = { 
  label: "Component A",
  color: "red"
};

// Inside component
function MyComponent() {
  return <MemoizedComponent config={STATIC_CONFIG} />;
}`} />
        </li>
        <li>
          <strong>Include dependencies in useMemo when needed</strong> - If your object depends on state or props, include them in the dependency array
          <CodeHighlight code={`const config = useMemo(() => ({
  label: \`Component \${id}\`,
  color: selectedColor,
  isActive: isSelected
}), [id, selectedColor, isSelected]); // Recreates when dependencies change`} />
        </li>
        
        <li>
          <strong>Use custom comparison function when needed</strong> - For complex objects, provide a custom comparison function to React.memo
          <CodeHighlight code={`const MemoizedComponent = React.memo(Component, 
  (prevProps, nextProps) => {
    // Custom deep comparison for complex objects
    return (
      prevProps.config.id === nextProps.config.id &&
      prevProps.config.type === nextProps.config.type
      // Only compare the properties you care about
    );
  }
);`} />
        </li>
        <li>
          <strong>Avoid side effects in memoized components</strong> - React's Strict Mode will render components twice in development to help detect issues
          <CodeHighlight code={`// BAD: Side effect in component body
const MemoizedComponent = React.memo(function Component(props) {
  // This will run twice in Strict Mode!
  saveToDatabase(props.data);
  
  return <div>{props.data.name}</div>;
});

// GOOD: Use useEffect for side effects
const MemoizedComponent = React.memo(function Component(props) {
  useEffect(() => {
    // This will still run twice in Strict Mode,
    // but React handles cleanup between runs
    saveToDatabase(props.data);
    
    // Optional cleanup function
    return () => {
      // Clean up any resources if needed
    };
  }, [props.data]);
  
  return <div>{props.data.name}</div>;
});`} />
        </li>
        <li>
          <strong>Use useMemo as an optimization, not a fix</strong> - If your code doesn't work without useMemo, there's likely an underlying issue to address first.
          <div>Keep your rendering logic pure. If re-rendering a component causes a problem or produces some noticeable visual artifact, it's a bug in your component! Fix the bug instead of adding memoization.</div>
          <CodeHighlight code={`// BAD: Using useMemo to "fix" a broken component
function BrokenComponent() {
  // This component has a bug that causes infinite loops
  // Adding useMemo is just masking the real problem
  const data = useMemo(() => processData(), []); 
  return <div>{data}</div>;
}

// GOOD: Fix the underlying issue first, then optimize
function FixedComponent() {
  // First ensure the component works correctly without memoization
  // Then add useMemo as a performance optimization
  const expensiveData = useMemo(() => {
    return computeExpensiveValue(a, b);
  }, [a, b]);
  
  return <div>{expensiveData}</div>;
}`} />
          
        </li>
        <li>
          <strong>Use useMemo for objects in dependency arrays</strong> - Wrap objects used in dependency arrays of useEffect, useCallback, and other useMemos
          <CodeHighlight code={`// BAD: Object reference changes on every render
function Component() {
  const options = { id: userId, sort: 'asc' };
  
  // This effect runs on EVERY render because options is a new object each time
  useEffect(() => {
    fetchData(options);
  }, [options]); // ❌ New reference on every render
  
  return <div>Data loading...</div>;
}

// GOOD: Stable object reference with useMemo
function Component() {
  const options = useMemo(() => ({ 
    id: userId, 
    sort: 'asc' 
  }), [userId]); // Only changes when userId changes
  
  // This effect only runs when userId changes
  useEffect(() => {
    fetchData(options);
  }, [options]); // ✅ Stable reference between renders
  
  return <div>Data loading...</div>;
}`} />
        </li>
      </ul>
    </div>
  );
};

export default BestPractices;
