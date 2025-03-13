import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Demo.module.css';

// A component that simulates expensive rendering and shows when it re-renders
const ExpensiveComponent = ({ label, onUpdate }) => {
  console.log(`Rendering ExpensiveComponent with label: ${label}`);
  const componentRef = useRef(null);
  
  // Simulate expensive calculation
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Artificial delay to simulate expensive calculation (10ms)
  }
  
  // Add highlight effect on render by directly modifying the border
  useEffect(() => {
    if (componentRef.current) {
      // Highlight the border
      componentRef.current.style.borderColor = '#0070f3';
      componentRef.current.style.borderWidth = '3px';
      componentRef.current.style.boxShadow = '0 0 15px rgba(0, 112, 243, 0.5)';
      
      // Reset after animation completes
      const timer = setTimeout(() => {
        if (componentRef.current) {
          componentRef.current.style.borderColor = '';
          componentRef.current.style.borderWidth = '';
          componentRef.current.style.boxShadow = '';
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  });
  
  return (
    <div className={styles.expensiveComponent} ref={componentRef}>
      <div className={styles.componentHeader}>
        <h3>{label}</h3>
      </div>
      <button 
        onClick={onUpdate}
        className={styles.button}
      >
        Update Parent
      </button>
    </div>
  );
};

export default React.memo(ExpensiveComponent);
