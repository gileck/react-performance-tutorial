import React from 'react';
import { useAppContext } from './AppContext';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const Header = () => {
  console.log('Header rendering');
  const { theme, setTheme, user, notifications } = useAppContext();
  
  // This component re-renders whenever any context value changes
  // even though it only uses theme, user, and notifications
  
  return highlightUpdates(
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.logo}>E-Commerce Dashboard</div>
      <div className={styles.themeToggle}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <div className={styles.userInfo}>
        <span>{user.name}</span>
        <div className={styles.notificationBadge}>
          {notifications.length > 0 && <span>{notifications.length}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
