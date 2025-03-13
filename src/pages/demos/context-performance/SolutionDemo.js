import React from 'react';
import styles from '@/styles/Demo.module.css';
import ExpensiveComponent from './ExpensiveComponent';
import { 
  OptimizedThemeProvider,
  useThemeValue,
  useFontSize,
  useColor
} from './contexts/OptimizedThemeContext';
import CodeHighlight from '@/components/CodeHighlight';

// Component that only uses theme
const ThemeAwareComponent = React.memo(() => {
  console.log('Rendering ThemeAwareComponent');
  const { theme, setTheme } = useThemeValue();
  
  return (
    <ExpensiveComponent 
      label={`Theme Component (theme: ${theme})`}
    />
  );
});

// Component that only uses fontSize
const FontSizeAwareComponent = React.memo(() => {
  console.log('Rendering FontSizeAwareComponent');
  const { fontSize, setFontSize } = useFontSize();
  
  return (
    <ExpensiveComponent 
      label={`Font Size Component (size: ${fontSize})`}
    />
  );
});

// Component that only uses primaryColor
const ColorAwareComponent = React.memo(() => {
  console.log('Rendering ColorAwareComponent');
  const { primaryColor, setPrimaryColor } = useColor();
  
  return (
    <ExpensiveComponent 
      label={`Color Component (color: ${primaryColor})`}
    />
  );
});

// Controls split into separate components for each context
const ThemeControls = React.memo(() => {
  const { theme, setTheme } = useThemeValue();
  return (
    <button 
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      className={styles.button}
    >
      Toggle Theme
    </button>
  );
});

const FontSizeControls = React.memo(() => {
  const { fontSize, setFontSize } = useFontSize();
  return (
    <button 
      onClick={() => setFontSize(s => s === 'medium' ? 'large' : 'medium')}
      className={styles.button}
    >
      Toggle Font Size
    </button>
  );
});

const ColorControls = React.memo(() => {
  const { primaryColor, setPrimaryColor } = useColor();
  return (
    <button 
      onClick={() => setPrimaryColor(c => 
        c === '#0070f3' ? '#f0506e' : '#0070f3'
      )}
      className={styles.button}
    >
      Toggle Color
    </button>
  );
});

const Controls = () => (
  <div className={styles.controls}>
    <ThemeControls />
    <FontSizeControls />
    <ColorControls />
  </div>
);

const SolutionDemo = () => {
  return (
    <div className={styles.demoSection}>
      <h2>Solution: Split Contexts and Memoize Values</h2>
      <p>
        By splitting the context into separate providers and memoizing their values,
        we ensure that components only re-render when their specific context changes.
      </p>
      
      <div className={styles.demoContainer}>
        <OptimizedThemeProvider>
          <Controls />
          
          <div className={styles.componentsContainer}>
            <ThemeAwareComponent />
            <FontSizeAwareComponent />
            <ColorAwareComponent />
          </div>
          
          <CodeHighlight code={`// Solution: Separate contexts for different concerns
export const ThemeContext = createContext();
export const FontSizeContext = createContext();
export const ColorContext = createContext();

// Individual providers with memoized values
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  // Memoize the value object
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Combine providers
export const OptimizedThemeProvider = ({ children }) => (
  <ThemeProvider>
    <FontSizeProvider>
      <ColorProvider>
        {children}
      </ColorProvider>
    </FontSizeProvider>
  </ThemeProvider>
);

// Components only subscribe to what they need
const ThemeAwareComponent = React.memo(() => {
  const { theme } = useThemeValue(); // Only subscribes to theme
  return <ExpensiveComponent label={\`Theme: \${theme}\`} />;
});

const FontSizeAwareComponent = React.memo(() => {
  const { fontSize } = useFontSize(); // Only subscribes to fontSize
  return <ExpensiveComponent label={\`Size: \${fontSize}\`} />;
});</code>`} />
          
          <div className={styles.explanation}>
            <h3>What's happening?</h3>
            <p>
              Now click any of the buttons above and watch the border highlights.
              You'll notice that <strong>only the component that uses the changed value
              re-renders</strong>. The other components remain unchanged.
            </p>
            <p>
              This optimization works because:
            </p>
            <ol>
              <li>
                Each context is responsible for a single concern
              </li>
              <li>
                Context values are memoized with useMemo
              </li>
              <li>
                Components only subscribe to the context they need
              </li>
              <li>
                React.memo can now prevent re-renders effectively
              </li>
            </ol>
          </div>
        </OptimizedThemeProvider>
      </div>
    </div>
  );
};

export default SolutionDemo;
