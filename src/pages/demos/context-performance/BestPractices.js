import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices for Context Performance</h2>
      <ul>
        <li>
          <strong>Split Context by Concern</strong> - Separate independent values into different contexts
          <CodeHighlight code={`// BAD: Single context with multiple concerns
const AppContext = createContext();
const AppProvider = ({ children }) => ({
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  
  return (
    <AppContext.Provider value={{ 
      theme, setTheme, 
      user, setUser, 
      cart, setCart 
    }}>
      {children}
    </AppContext.Provider>
  );
});

// GOOD: Separate contexts by concern
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();

const AppProvider = ({ children }) => (
  <ThemeProvider>
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  </ThemeProvider>
);`} />
        </li>
        <li>
          <strong>Memoize Context Values</strong> - Use useMemo to prevent unnecessary re-renders
          <CodeHighlight code={`// BAD: New object on every render
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// GOOD: Memoized context value
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]); // Only changes when theme changes
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};`} />
        </li>
        <li>
          <strong>Keep State Close to Usage</strong> - Don't put everything in context
          <CodeHighlight code={`// BAD: Using context for local state
const FormContext = createContext();

const Form = () => (
  <FormContext.Provider value={formState}>
    <FormFields />
  </FormContext.Provider>
);

// GOOD: Pass props for local state
const Form = () => {
  const [formState, setFormState] = useState({});
  return <FormFields state={formState} onChange={setFormState} />;
};`} />
        </li>
        <li>
          <strong>Consider Context Alternatives</strong> - Don't overuse context
          <CodeHighlight code={`// Consider prop drilling for shallow trees
const App = () => {
  const [theme, setTheme] = useState('light');
  return (
    <Layout theme={theme}>
      <Sidebar theme={theme} />
      <Main theme={theme} />
    </Layout>
  );
};

// Consider component composition
const Layout = ({ menu, content }) => (
  <div>
    <nav>{menu}</nav>
    <main>{content}</main>
  </div>
);

// Use context for truly global state
const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  </AuthProvider>
);`} />
        </li>
      </ul>
      
      <div className={styles.warning}>
        <h3>Performance Considerations</h3>
        <p>
          Remember these key points when optimizing context:
        </p>
        <ul>
          <li>Context is not slow by default - poor patterns make it slow</li>
          <li>Don't split context too granularly - it can increase complexity</li>
          <li>Profile your app to identify actual performance bottlenecks</li>
          <li>Consider bundle size when creating multiple contexts</li>
        </ul>
      </div>
    </div>
  );
};

export default BestPractices;
