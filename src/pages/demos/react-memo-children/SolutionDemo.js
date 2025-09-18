import React, { useState, useMemo } from 'react';
import styles from '@/styles/Demo.module.css';
import Container from './Container';
import ExpensiveChild from './ExpensiveChild';
import CodeHighlight from '@/components/CodeHighlight';

const SolutionDemo = () => {
  const [count, setCount] = useState(0);
  
  // Create stable references for the children using useMemo
  const containerAChildren = useMemo(() => (
    <>
      <ExpensiveChild label="Child A1" />
      <ExpensiveChild label="Child A2" />
    </>
  ), []); // Empty dependency array = children never change
  
  const containerBChildren = useMemo(() => (
    <>
      <ExpensiveChild label="Child B1" />
      <ExpensiveChild label="Child B2" />
    </>
  ), []);
  
  return (
    <div className={styles.demoSection}>
      <h2>Solution: Memoize the Children</h2>
      <p>
        By wrapping the children in useMemo, we maintain a stable reference for the
        <code>children</code> prop. This primarily prevents the memoized parent
        <code>Container</code> from re-rendering, because its props (including
        <code>children</code>) are shallow-equal between renders. As a consequence, the
        children also avoid unnecessary re-renders.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={() => setCount(c => c + 1)}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          {/* These won't re-render because children references are stable */}
          <Container label="Container A">
            {containerAChildren}
          </Container>
          
          <Container label="Container B">
            {containerBChildren}
          </Container>
        </div>
        
        <CodeHighlight code={`// Solution: Memoize children with useMemo
// Define and memoize the container within this example for clarity
const Container = React.memo(({ children, label }) => {
  return (
    <div>
      <h3>{label}</h3>
      {children}
    </div>
  );
});

// Memoized child
const ExpensiveChild = React.memo(({ label }) => {
  return <div>{label}</div>;
});

const ParentComponent = () => {
  const [count, setCount] = React.useState(0);
  
  // Create stable references for children
  const containerAChildren = React.useMemo(() => (
    <>
      <ExpensiveChild label="Child A1" />
      <ExpensiveChild label="Child A2" />
    </>
  ), []); // Empty deps = never changes
  
  const containerBChildren = React.useMemo(() => (
    <>
      <ExpensiveChild label="Child B1" />
      <ExpensiveChild label="Child B2" />
    </>
  ), []);
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      
      {/* Pass memoized children */}
      <Container label="Container A">
        {containerAChildren}
      </Container>
      
      <Container label="Container B">
        {containerBChildren}
      </Container>
    </>
  );
};`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            We are optimizing the <strong>parent</strong> (the memoized <code>Container</code>) by stabilizing
            its <code>children</code> prop. React.memo performs a shallow comparison of props; since the
            <code>children</code> reference is the same between renders, the <code>Container</code> does not
            re-render.
          </p>
          <p>
            The child elements are created once (on mount) and the same references are reused on subsequent
            renders, so both the parent <em>and</em> the child avoid unnecessary re-renders.
          </p>
          <p>
            Watch the border highlights - you'll see that nothing re-renders when you
            click the button because all the props (including children) maintain stable
            references.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDemo;
