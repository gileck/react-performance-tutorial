import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>What is useCallback?</h2>
      <p>
        <code>useCallback</code> is a React Hook that returns a memoized version of a callback function.
        This means the function maintains the same reference between renders unless its dependencies change.
        It's particularly useful when passing callbacks to optimized child components that rely on reference equality
        to prevent unnecessary renders.
      </p>
      
      <CodeHighlight code={`// Without useCallback - new function reference on every render
function ParentComponent() {
  const handleClick = () => {
    console.log('clicked');
  };
  return <MemoizedChild onClick={handleClick} />;
}

// With useCallback - stable function reference
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Empty array = function never changes
  return <MemoizedChild onClick={handleClick} />;
}`} />
      
      <p>
        It's especially important when:
      </p>
      <ul>
        <li>Passing callbacks to memoized components (using React.memo)</li>
        <li>Callbacks are used as dependencies in useEffect hooks</li>
        <li>You need to maintain function identity between renders</li>
      </ul>
      
      <p>
        In this demo, we'll see how useCallback works together with React.memo to prevent
        unnecessary re-renders caused by changing function references.
      </p>
    </div>
  );
};

export default Introduction;
