import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const Introduction = () => {
  return (
    <div className={styles.intro}>
      <h2>What is React Context?</h2>
      <p>
        React Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered "global" for a tree of React components.
      </p>
      
      <h3>Common Use Cases</h3>
      <p>Context is typically used for data like:</p>
      <ul>
        <li><strong>Theme (colors, fonts)</strong> - Components throughout your app need to know the current theme</li>
        <li><strong>User authentication</strong> - Many components need to know if a user is logged in</li>
        <li><strong>Language/locale</strong> - For internationalization across your app</li>
        <li><strong>App-wide settings</strong> - Configuration that affects multiple components</li>
      </ul>

      <h3>Basic Theme Example</h3>
      <CodeHighlight code={`// Creating a theme context
const ThemeContext = createContext();

// Theme provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Using the context in a component
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header className={\`header-\${theme}\`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
};

// App structure
const App = () => (
  <ThemeProvider>
    <Header />
    <MainContent />
    <Footer />
  </ThemeProvider>
);`} />

      <h2>Context Performance Challenges</h2>
      <p>
        While Context is powerful, it can cause performance issues if not used carefully. The main challenges are:
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
