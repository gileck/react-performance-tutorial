import React from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import CodeHighlight from '@/components/CodeHighlight';

// Component that only needs theme but gets all context
const ThemeAwareComponent = React.memo(() => {
  console.log('Rendering ThemeAwareComponent');
  const context = useTheme(); // Get entire context
  
  return (
    <ExpensiveComponent 
      label={`Theme Component (theme: ${context.theme})`}
    />
  );
});

// Component that only needs fontSize but gets all context
const FontSizeAwareComponent = React.memo(() => {
  console.log('Rendering FontSizeAwareComponent');
  const context = useTheme(); // Get entire context
  
  return (
    <ExpensiveComponent 
      label={`Font Size Component (size: ${context.fontSize})`}
    />
  );
});

// Component that only needs primaryColor but gets all context
const ColorAwareComponent = React.memo(() => {
  console.log('Rendering ColorAwareComponent');
  const context = useTheme(); // Get entire context
  
  return (
    <ExpensiveComponent 
      label={`Color Component (color: ${context.primaryColor})`}
    />
  );
});

// Controls component that changes context values
const ThemeControls = () => {
  const { 
    theme, setTheme,
    fontSize, setFontSize,
    primaryColor, setPrimaryColor
  } = useTheme();
  
  return (
    <div className={styles.controls}>
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        className={styles.button}
      >
        Toggle Theme
      </button>
      <button 
        onClick={() => setFontSize(s => s === 'medium' ? 'large' : 'medium')}
        className={styles.button}
      >
        Toggle Font Size
      </button>
      <button 
        onClick={() => setPrimaryColor(c => 
          c === '#0070f3' ? '#f0506e' : '#0070f3'
        )}
        className={styles.button}
      >
        Toggle Color
      </button>
    </div>
  );
};

const ProblemDemo = () => {
  return (
    <div className={styles.demoSection}>
      <h2>Problem: Context Triggers Unnecessary Re-renders</h2>
      <p>
        Even though each component only uses one part of the context,
        they all re-render when any context value changes. This happens because:
      </p>
      <ul>
        <li>All values are stored in a single context</li>
        <li>The context value object is recreated on every render</li>
        <li>React.memo can't prevent re-renders when context changes</li>
      </ul>
      
      <div className={styles.demoContainer}>
        <ThemeProvider>
          <ThemeControls />
          
          <div className={styles.componentsContainer}>
            <ThemeAwareComponent />
            <FontSizeAwareComponent />
            <ColorAwareComponent />
          </div>
          
          <CodeHighlight code={`// Problem: Single context with all values
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  
  // New object created every render
  const value = {
    theme, setTheme,
    fontSize, setFontSize,
    primaryColor, setPrimaryColor
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Components re-render even when using React.memo
const ThemeAwareComponent = React.memo(() => {
  const { theme } = useTheme(); // Only uses theme
  return <ExpensiveComponent label={\`Theme: \${theme}\`} />;
});

const FontSizeAwareComponent = React.memo(() => {
  const { fontSize } = useTheme(); // Only uses fontSize
  return <ExpensiveComponent label={\`Size: \${fontSize}\`} />;
});</code>`} />
          
          <div className={styles.explanation}>
            <h3>What's happening?</h3>
            <p>
              Click any of the buttons above and watch the border highlights.
              You'll notice that <strong>all</strong> components re-render when
              <strong>any</strong> context value changes, even though each component
              only uses one specific value.
            </p>
            <p>
              This happens because:
            </p>
            <ol>
              <li>
                The provider creates a new context value object on every render
              </li>
              <li>
                When the context value changes, all consumers re-render
              </li>
              <li>
                React.memo can't help because the context value is always new
              </li>
            </ol>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ProblemDemo;
