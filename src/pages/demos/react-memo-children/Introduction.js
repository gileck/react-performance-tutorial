import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>React.memo and Children Props</h2>
      <p>
        When using React.memo with components that accept children props, you might encounter
        unexpected re-renders even when the component is memoized. This happens because
        JSX elements create new references on every render of the parent component.
      </p>
      
      <CodeHighlight code={`// This creates new JSX references on every render
const Parent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <MemoizedContainer>
      <div>I am a child</div>
      <ExpensiveComponent />
    </MemoizedContainer>
  );
};

// Even with React.memo, this will re-render
const Container = React.memo(({ children }) => {
  return <div>{children}</div>;
});`} />
      
      <p>
        The issue arises because:
      </p>
      <ul>
        <li>
          JSX elements are just JavaScript objects created during render
        </li>
        <li>
          New objects are created each time the parent component renders
        </li>
        <li>
          React.memo performs shallow comparison of props
        </li>
        <li>
          New object references are seen as changed props, triggering re-renders
        </li>
      </ul>
      
      <p>
        In this demo, we'll see how this affects performance and learn how to properly
        optimize components that receive children props using a combination of React.memo
        and useMemo.
      </p>
    </div>
  );
};

export default Introduction;
