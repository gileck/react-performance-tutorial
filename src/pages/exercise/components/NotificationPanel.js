import React, { useState } from 'react';
import { useAppContext } from './AppContext';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

const NotificationPanel = () => {
  console.log('NotificationPanel rendering');
  const { notifications, setNotifications } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handleRemove = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  
  // Generate dummy notifications if none exist
  if (notifications.length === 0) {
    const dummyNotifications = [
      { id: 1, message: 'New order received', time: '10 minutes ago', read: false },
      { id: 2, message: 'Product inventory low', time: '1 hour ago', read: false },
      { id: 3, message: 'Customer feedback received', time: '3 hours ago', read: true }
    ];
    setNotifications(dummyNotifications);
  }
  
  return highlightUpdates(
    <div className={styles.notificationPanel}>
      <div className={styles.panelHeader}>
        <h3>Notifications ({notifications.length})</h3>
        <div className={styles.panelActions}>
          <button onClick={toggleExpanded}>
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      </div>
      
      {expanded && (
        <div className={styles.notificationList}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notificationItem} ${notification.read ? styles.read : styles.unread}`}
            >
              <div className={styles.notificationContent}>
                <p>{notification.message}</p>
                <span className={styles.notificationTime}>{notification.time}</span>
              </div>
              <button 
                className={styles.notificationRemove} 
                onClick={() => handleRemove(notification.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
