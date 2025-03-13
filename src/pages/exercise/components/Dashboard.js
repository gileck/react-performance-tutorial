import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import UserProfile from './UserProfile';
import NotificationPanel from './NotificationPanel';
import StatisticsPanel from './StatisticsPanel';
import styles from '@/styles/Exercise.module.css';

const Dashboard = () => {
  const { setProducts } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    inStock: true
  });

  // Simulate API call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dummy product data
      const dummyProducts = Array(20).fill().map((_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: Math.floor(Math.random() * 500) + 50,
        category: ['Electronics', 'Clothing', 'Home', 'Books'][Math.floor(Math.random() * 4)],
        inStock: Math.random() > 0.3
      }));
      
      setProducts(dummyProducts);
    };
    
    fetchProducts();
  }, [setProducts]);

  // Problem: Creating new function reference on every render
  // This will cause SearchBar to re-render unnecessarily even with React.memo
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Problem: Creating new function reference on every render
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Problem: Creating new object on every render
  // This will break memoization in FilterPanel
  const filterOptions = {
    categories: ['Electronics', 'Clothing', 'Home', 'Books'],
    priceRange: [0, 1000],
    inStock: filters.inStock
  };

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.dashboardContent}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.topBar}>
            {/* Problem: Inline function prop */}
            <SearchBar onSearch={(term) => handleSearch(term)} />
            
            {/* Problem: Inline object prop */}
            <FilterPanel options={filterOptions} onFilterChange={handleFilterChange} />
            
            <UserProfile />
          </div>
          
          <div className={styles.panels}>
            {/* Problem: Children props breaking memoization */}
            <StatisticsPanel>
              <div className={styles.statsContent}>
                <h3>Sales Overview</h3>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>$12,456</span>
                    <span className={styles.statLabel}>Revenue</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>342</span>
                    <span className={styles.statLabel}>Orders</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>28%</span>
                    <span className={styles.statLabel}>Growth</span>
                  </div>
                </div>
              </div>
            </StatisticsPanel>
            
            <NotificationPanel />
          </div>
          
          <ProductList searchTerm={searchTerm} filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
