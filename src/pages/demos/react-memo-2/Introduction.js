import React from 'react';
import styles from '@/styles/Demo.module.css';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>React.memo and Object Props</h2>
      <p>
        While <code>React.memo</code> is great for preventing unnecessary re-renders, it has a limitation:
        it performs a <strong>shallow comparison</strong> of props. This means that when you pass object props,
        React.memo might not work as expected.
      </p>
      <p>
        This demo shows:
      </p>
      <ul>
        <li>Why React.memo fails with inline object props</li>
        <li>How to properly use React.memo with object props using useMemo</li>
        <li>The performance impact of stable vs. unstable object references</li>
      </ul>
      <p>
        Understanding this concept is crucial for effectively optimizing React applications,
        especially when working with complex data structures.
      </p>
    </div>
  );
};

export default Introduction;
