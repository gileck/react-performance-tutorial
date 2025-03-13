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
        By wrapping the children in useMemo, we maintain stable references between renders.
        This allows React.memo to work effectively on the Container components.
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
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  // Create stable references for children
  const containerAChildren = useMemo(() => (
    <>
      <ExpensiveChild label="Child A1" />
      <ExpensiveChild label="Child A2" />
    </>
  ), []); // Empty deps = never changes
  
  const containerBChildren = useMemo(() => (
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
};</code>`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            Now when you click the button, neither the containers nor their children
            re-render. This is because we've used useMemo to create stable references
            for the children JSX.
          </p>
          <p>
            The children are only created once (when the component mounts) and then
            those same references are reused for every render. When React.memo
            compares the Container's props, it sees the same children reference and
            prevents the re-render.
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
