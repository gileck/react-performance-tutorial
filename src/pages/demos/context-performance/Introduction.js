import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>Context Performance Optimization</h2>
      <p>
        React Context is a powerful tool for sharing state across components, but it can
        cause performance issues if not used carefully. The main challenges are:
      </p>
      
      <ul>
        <li>All context consumers re-render when the context value changes</li>
        <li>Context values are compared by reference</li>
        <li>Object values in context create new references on every render</li>
      </ul>
      
      <CodeHighlight code={`// Common performance pitfall with context
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [value1, setValue1] = useState('a');
  const [value2, setValue2] = useState('b');
  
  // Problem: New object created every render
  const value = {
    value1,
    value2,
    setValue1,
    setValue2
  };
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// This component re-renders when ANY value in context changes
const MyComponent = () => {
  const { value1 } = useContext(MyContext);
  return <div>{value1}</div>; // Only uses value1
};`} />
      
      <p>
        In this demo, we'll explore:
      </p>
      <ul>
        <li>Why context can cause unnecessary re-renders</li>
        <li>How to split context by concern</li>
        <li>How to memoize context values</li>
        <li>Best practices for context performance</li>
      </ul>
      
      <div className={styles.note}>
        <strong>Note:</strong> Context optimization is particularly important when:
        <ul>
          <li>Your context is used by many components</li>
          <li>Your context values change frequently</li>
          <li>Your context consumers are expensive to render</li>
          <li>Your context includes multiple independent values</li>
        </ul>
      </div>
    </div>
  );
};

export default Introduction;
