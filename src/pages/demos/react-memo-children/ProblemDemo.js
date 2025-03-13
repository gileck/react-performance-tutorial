import React, { useState } from 'react';
import styles from '@/styles/Demo.module.css';
import Container from './Container';
import ExpensiveChild from './ExpensiveChild';
import CodeHighlight from '@/components/CodeHighlight';

const ProblemDemo = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className={styles.demoSection}>
      <h2>Problem: React.memo Isn't Enough for Children</h2>
      <p>
        Even though both Container and ExpensiveChild are wrapped in React.memo,
        the children still cause re-renders because they create new references on
        every render of the parent.
      </p>
      
      <div className={styles.demoContainer}>
        <button 
          onClick={() => setCount(c => c + 1)}
          className={styles.button}
        >
          Increment Count: {count}
        </button>
        
        <div className={styles.componentsContainer}>
          {/* Even with React.memo, these will re-render */}
          <Container label="Container A">
            <ExpensiveChild label="Child A1" />
            <ExpensiveChild label="Child A2" />
          </Container>
          
          <Container label="Container B">
            <ExpensiveChild label="Child B1" />
            <ExpensiveChild label="Child B2" />
          </Container>
        </div>
        
        <CodeHighlight code={`// Problem: React.memo isn't enough
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      
      {/* These create new children references on every render */}
      <Container label="Container A">
        <ExpensiveChild label="Child A1" />
        <ExpensiveChild label="Child A2" />
      </Container>
      
      <Container label="Container B">
        <ExpensiveChild label="Child B1" />
        <ExpensiveChild label="Child B2" />
      </Container>
    </>
  );
};

// Even with React.memo, containers will re-render
const Container = React.memo(({ children, label }) => {
  return (
    <div>
      <h3>{label}</h3>
      {children} {/* New reference on every parent render */}
    </div>
  );
});</code>`} />
        
        <div className={styles.explanation}>
          <h3>What's happening?</h3>
          <p>
            When the parent component re-renders (by clicking the button), it creates
            new instances of the JSX for the ExpensiveChild components. These new
            instances are passed as the children prop to the Container components.
          </p>
          <p>
            Even though both Container and ExpensiveChild are wrapped in React.memo,
            the Container components still re-render because they receive new children
            prop references on every render. React.memo's shallow comparison sees these
            new references as different props.
          </p>
          <p>
            Watch the border highlights - you'll see both the containers (pink borders)
            and their children (blue borders) re-render every time you click the button,
            even though nothing about them has actually changed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemDemo;
