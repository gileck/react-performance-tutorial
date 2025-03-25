import React from 'react';
import styles from '@/styles/Demo.module.css';

export const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>React Performance Fundamentals</h2>
      <p>
        React performance optimization is a critical aspect of building responsive and efficient applications.
        While specific techniques like <code>React.memo</code>, <code>useCallback</code>, and <code>useMemo</code> are powerful tools,
        there are fundamental principles that can often eliminate the need for these optimizations altogether.
      </p>
      <p>
        This guide presents general React performance guidelines that can help you write naturally efficient React code.
        By following these principles, you'll not only reduce the need for explicit memoization but also
        create components that are easier to understand, debug, and maintain.
      </p>
      <p>
        Key principles include:
      </p>
      <ul>
        <li>Using component composition with children props</li>
        <li>Keeping state as local as possible</li>
        <li>Maintaining pure rendering logic</li>
        <li>Avoiding unnecessary effects that update state</li>
        <li>Minimizing effect dependencies</li>
      </ul>
      <p>
        Remember that premature optimization can lead to more complex code without significant benefits.
        The best approach is to first write clean, maintainable code following these guidelines,
        and then use profiling tools to identify and address specific performance bottlenecks.
      </p>
    </div>
  );
};

export default Introduction;
