import React from 'react';
import styles from '@/styles/Demo.module.css';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>What is React.memo?</h2>
      <p>
        <code>React.memo</code> is a higher-order component that memoizes your component,
        preventing it from re-rendering when its props haven't changed. This can significantly
        improve performance by avoiding unnecessary renders of expensive components.
      </p>
      <p>
        It's especially useful when:
      </p>
      <ul>
        <li>You have components that render often with the same props</li>
        <li>Your component performs expensive calculations or renders</li>
        <li>Your app has performance issues due to excessive re-rendering</li>
      </ul>
    </div>
  );
};

export default Introduction;
