import React, { createContext, useState, useContext } from 'react';

// Problem: Single context with multiple unrelated values
// This causes all consumers to re-render when any value changes
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Problem: New object reference on every render
  // This causes all context consumers to re-render even if values haven't changed
  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      user,
      setUser,
      products,
      setProducts,
      cart,
      setCart,
      notifications,
      setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
