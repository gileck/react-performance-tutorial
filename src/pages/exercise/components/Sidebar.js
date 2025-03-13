import React from 'react';
import { useAppContext } from './AppContext';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const Sidebar = () => {
  console.log('Sidebar rendering');
  const { theme } = useAppContext();
  
  // This component only needs theme from context
  // but will re-render when any context value changes
  
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Products', icon: '📦' },
    { id: 3, name: 'Orders', icon: '🛒' },
    { id: 4, name: 'Customers', icon: '👥' },
    { id: 5, name: 'Analytics', icon: '📈' },
    { id: 6, name: 'Settings', icon: '⚙️' }
  ];
  
  return highlightUpdates(
    <aside className={`${styles.sidebar} ${styles[theme]}`}>
      <nav>
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <a href="#" className={styles.menuItem}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
