import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';
import exerciseStyles from '@/styles/Exercise.module.css';
import CodeHighlight from '@/components/CodeHighlight';

export default function SolutionsPage() {
  return (
    <>
      <Head>
        <title>Exercise Solutions - React Performance</title>
        <meta name="description" content="Solutions for the React performance optimization exercise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>React Performance Exercise - Solutions</h1>
          <div className={exerciseStyles.exerciseLinks}>
            <Link href="/exercise" className={exerciseStyles.exerciseLink}>
              <span className={exerciseStyles.linkIcon}>⬅️</span>
              Back to Exercise
            </Link>
          </div>
        </div>
        
        <div className={styles.demoWrapper}>
          <div className={styles.demoSection}>
            <h1>React Performance Optimization Exercise - Solutions</h1>

            <p>This document identifies all the performance issues in the exercise and provides solutions with code examples.</p>

            <h2>Issue 1: Unnecessary Re-renders with React.memo</h2>

            <h3>Problem</h3>
            <p>The <code>ProductCard</code> component re-renders unnecessarily when the parent component (<code>ProductList</code>) re-renders, even though its props haven't changed.</p>

            <h3>Solution</h3>
            <p>Apply <code>React.memo</code> to prevent unnecessary re-renders:</p>

            <CodeHighlight code={`// Before
const ProductCard = ({ product }) => {
  // Expensive rendering...
  return (
    <div className={styles.productCard}>
      <h3>{product.name}</h3>
      <p>ֿֿ\${product.price}</p>
    </div>
  );
};

// After
const ProductCard = React.memo(({ product }) => {
  // Expensive rendering...
  return (
    <div className={styles.productCard}>
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
    </div>
  );
});`} />

            <h2>Issue 2: Inline Object Props Breaking Memoization</h2>

            <h3>Problem</h3>
            <p>The <code>FilterPanel</code> component is memoized with <code>React.memo</code>, but it still re-renders unnecessarily because it receives an inline object prop.</p>

            <h3>Solution</h3>
            <p>Use <code>useMemo</code> to create a stable object reference:</p>

            <CodeHighlight code={`// Before
const Dashboard = () => {
  // ...
  // Problem: Creating new object on every render
  const filterOptions = {
    categories: ['Electronics', 'Clothing', 'Home', 'Books'],
    priceRange: [0, 1000],
    inStock: filters.inStock
  };
  
  return (
    <div>
      <FilterPanel options={filterOptions} onFilterChange={handleFilterChange} />
      {/* ... */}
    </div>
  );
};

// After
const Dashboard = () => {
  // ...
  // Solution: Memoized object reference
  const filterOptions = useMemo(() => ({
    categories: ['Electronics', 'Clothing', 'Home', 'Books'],
    priceRange: [0, 1000],
    inStock: filters.inStock
  }), [filters.inStock]); // Only recreate when inStock changes
  
  return (
    <div>
      <FilterPanel options={filterOptions} onFilterChange={handleFilterChange} />
      {/* ... */}
    </div>
  );
};`} />

            <h2>Issue 3: Function Props Causing Re-renders</h2>

            <h3>Problem</h3>
            <p>The <code>SearchBar</code> component is memoized, but it re-renders unnecessarily because it receives a new function reference on each render.</p>

            <h3>Solution</h3>
            <p>Use <code>useCallback</code> to maintain a stable function reference:</p>

            <CodeHighlight code={`// Before
const Dashboard = () => {
  // ...
  // Problem: Creating new function reference on every render
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <div>
      <SearchBar onSearch={(term) => handleSearch(term)} />
      {/* ... */}
    </div>
  );
};

// After
const Dashboard = () => {
  // ...
  // Solution: Stable function reference with useCallback
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* ... */}
    </div>
  );
};`} />

            <h2>Issue 4: API Data Causing Unnecessary Re-renders</h2>

            <h3>Problem</h3>
            <p>The <code>ProductList</code> component fetches data from an API, creating new object references that cause all products to re-render even when their data hasn't changed.</p>

            <h3>Solution</h3>
            <p>Use a custom comparison function with <code>React.memo</code>:</p>

            <CodeHighlight code={`// Before
const ProductCard = React.memo(({ product }) => {
  // Component implementation...
});

// After
const ProductCard = React.memo(
  ({ product }) => {
    // Component implementation...
  },
  (prevProps, nextProps) => {
    // Only re-render if the product data actually changed
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.price === nextProps.product.price &&
      prevProps.product.category === nextProps.product.category &&
      prevProps.product.inStock === nextProps.product.inStock
    );
  }
);`} />

            <h2>Issue 5: Children Props Breaking Memoization</h2>

            <h3>Problem</h3>
            <p>The <code>StatisticsPanel</code> component is memoized, but it re-renders unnecessarily because it receives new children references on each render.</p>

            <h3>Solution</h3>
            <p>Use <code>useMemo</code> to maintain stable children references:</p>

            <CodeHighlight code={`// Before
const Dashboard = () => {
  // ...
  return (
    <div>
      <StatisticsPanel>
        <div className={styles.statsContent}>
          <h3>Sales Overview</h3>
          {/* ... */}
        </div>
      </StatisticsPanel>
      {/* ... */}
    </div>
  );
};

// After
const Dashboard = () => {
  // ...
  const statisticsChildren = useMemo(() => (
    <div className={styles.statsContent}>
      <h3>Sales Overview</h3>
      {/* ... */}
    </div>
  ), []); // Empty dependency array = never changes
  
  return (
    <div>
      <StatisticsPanel>{statisticsChildren}</StatisticsPanel>
      {/* ... */}
    </div>
  );
};`} />

            <h2>Issue 6: Context Performance Issues</h2>

            <h3>Problem</h3>
            <p>The <code>AppContext</code> contains multiple unrelated values, causing all context consumers to re-render when any value changes.</p>

            <h3>Solution</h3>
            <p>Split the context by concern and memoize context values:</p>

            <CodeHighlight code={`// Before
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({/* ... */});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Problem: New object reference on every render
  return (
    <AppContext.Provider value={{
      theme, setTheme,
      user, setUser,
      products, setProducts,
      cart, setCart,
      notifications, setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

// After
export const ThemeContext = createContext();
export const UserContext = createContext();
export const ProductsContext = createContext();
export const CartContext = createContext();
export const NotificationsContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
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

// Similar implementations for other providers

export const AppProvider = ({ children }) => (
  <ThemeProvider>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </ThemeProvider>
);`} />

            <h2>Issue 7: Missing Dependencies in useCallback</h2>

            <h3>Problem</h3>
            <p>The <code>handleSave</code> function in the <code>UserProfile</code> component is memoized with <code>useCallback</code>, but it's missing dependencies that it uses.</p>

            <h3>Solution</h3>
            <p>Add the necessary dependencies to the dependency array:</p>

            <CodeHighlight code={`// Before
const UserProfile = () => {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  
  // Problem: Missing dependency in useCallback
  const handleSave = useCallback(() => {
    setUser(editedUser);
    setIsEditing(false);
    
    // Simulate API call to save user data
    console.log('Saving user data:', editedUser);
  }, []); // Missing dependencies: editedUser
  
  // Component implementation...
};

// After
const UserProfile = () => {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  
  // Solution: Include all dependencies
  const handleSave = useCallback(() => {
    setUser(editedUser);
    setIsEditing(false);
    
    // Simulate API call to save user data
    console.log('Saving user data:', editedUser);
  }, [editedUser, setUser]); // Added missing dependencies
  
  // Component implementation...
};`} />

            <p>By applying these optimizations, you'll significantly improve the performance of the application by reducing unnecessary re-renders and optimizing component updates.</p>
          </div>
        </div>
      </div>
    </>
  );
}
