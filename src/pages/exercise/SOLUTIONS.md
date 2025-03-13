# React Performance Optimization Exercise - Solutions

This document identifies all the performance issues in the exercise and provides solutions with code examples.

## Issue 1: Unnecessary Re-renders with React.memo

### Problem
The `ProductCard` component re-renders unnecessarily when the parent component (`ProductList`) re-renders, even though its props haven't changed.

### Solution
Apply `React.memo` to prevent unnecessary re-renders:

```jsx
// Before
const ProductCard = ({ product }) => {
  // Expensive rendering...
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};

// After
const ProductCard = React.memo(({ product }) => {
  // Expensive rendering...
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});
```

## Issue 2: Inline Object Props Breaking Memoization

### Problem
The `FilterPanel` component is memoized with `React.memo`, but it still re-renders unnecessarily because it receives an inline object prop.

### Solution
Use `useMemo` to create a stable object reference:

```jsx
// Before
const Dashboard = () => {
  // ...
  return (
    <div>
      <FilterPanel 
        options={{ 
          showInStock: showInStock, 
          categories: categories 
        }} 
        onFilterChange={handleFilterChange} 
      />
      {/* ... */}
    </div>
  );
};

// After
const Dashboard = () => {
  // ...
  const filterOptions = useMemo(() => ({ 
    showInStock: showInStock, 
    categories: categories 
  }), [showInStock, categories]);
  
  return (
    <div>
      <FilterPanel 
        options={filterOptions} 
        onFilterChange={handleFilterChange} 
      />
      {/* ... */}
    </div>
  );
};
```

## Issue 3: Function Props Causing Re-renders

### Problem
The `SearchBar` component is memoized, but it re-renders unnecessarily because it receives a new function reference on each render.

### Solution
Use `useCallback` to maintain a stable function reference:

```jsx
// Before
const Dashboard = () => {
  // ...
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
  const handleSearchCallback = useCallback((term) => {
    handleSearch(term);
  }, []);
  
  return (
    <div>
      <SearchBar onSearch={handleSearchCallback} />
      {/* ... */}
    </div>
  );
};
```

## Issue 4: API Data Causing Unnecessary Re-renders

### Problem
The `ProductList` component fetches data from an API, creating new object references that cause all products to re-render even when their data hasn't changed.

### Solution
Use a custom comparison function with `React.memo`:

```jsx
// Before
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
      prevProps.product.price === nextProps.product.price
      // Add other relevant properties
    );
  }
);
```

## Issue 5: Children Props Breaking Memoization

### Problem
The `Panel` component is memoized, but it re-renders unnecessarily because it receives new children references on each render.

### Solution
Use `useMemo` to maintain stable children references:

```jsx
// Before
const Dashboard = () => {
  // ...
  return (
    <div>
      <Panel>
        <Statistics data={statsData} />
        <RecentActivity activities={recentActivities} />
      </Panel>
      {/* ... */}
    </div>
  );
};

// After
const Dashboard = () => {
  // ...
  const panelChildren = useMemo(() => (
    <>
      <Statistics data={statsData} />
      <RecentActivity activities={recentActivities} />
    </>
  ), [statsData, recentActivities]);
  
  return (
    <div>
      <Panel>{panelChildren}</Panel>
      {/* ... */}
    </div>
  );
};
```

## Issue 6: Context Performance Issues

### Problem
The `AppContext` contains multiple unrelated values, causing all context consumers to re-render when any value changes.

### Solution
Split the context by concern and memoize context values:

```jsx
// Before
const AppContext = createContext();

const AppProvider = ({ children }) => {
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
};

// After
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();

const ThemeProvider = ({ children }) => {
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

// Similar implementations for UserProvider and CartProvider

const AppProvider = ({ children }) => (
  <ThemeProvider>
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  </ThemeProvider>
);
```

## Issue 7: Missing Dependencies in useCallback

### Problem
The `handleSave` function in the `UserProfile` component is memoized with `useCallback`, but it's missing dependencies that it uses.

### Solution
Add the necessary dependencies to the dependency array:

```jsx
// Before
const UserProfile = () => {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  
  const handleSave = useCallback(() => {
    // This uses user but doesn't list it as a dependency
    saveUserData(user);
  }, []);
  
  // Component implementation...
};

// After
const UserProfile = () => {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  
  const handleSave = useCallback(() => {
    saveUserData(user);
  }, [user]); // Added user as a dependency
  
  // Component implementation...
};
```

## Issue 8: Overusing Context for Local State

### Problem
The `FormContext` is used to manage form state that is only needed by a few closely related components.

### Solution
Use local state and props instead of context for this scenario:

```jsx
// Before
const FormContext = createContext();

const Form = () => {
  const [formState, setFormState] = useState({});
  
  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      <FormFields />
      <FormButtons />
    </FormContext.Provider>
  );
};

// After
const Form = () => {
  const [formState, setFormState] = useState({});
  
  return (
    <>
      <FormFields state={formState} onChange={setFormState} />
      <FormButtons state={formState} onSubmit={() => submitForm(formState)} />
    </>
  );
};
```

By applying these optimizations, you'll significantly improve the performance of the application by reducing unnecessary re-renders and optimizing component updates.
