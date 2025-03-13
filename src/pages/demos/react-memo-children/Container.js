import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Container.module.css';

// A container component that receives children as props
const Container = ({ children, label }) => {
  console.log(`Rendering Container with label: ${label}`);
  const containerRef = useRef(null);
  
  // Add highlight effect on render
  useEffect(() => {
    if (containerRef.current) {
      // Highlight the border
      containerRef.current.style.borderColor = '#ff4081';
      containerRef.current.style.borderWidth = '3px';
      containerRef.current.style.boxShadow = '0 0 15px rgba(255, 64, 129, 0.5)';
      
      // Reset after animation
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.borderColor = '';
          containerRef.current.style.borderWidth = '';
          containerRef.current.style.boxShadow = '';
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  });
  
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerHeader}>
        <h3>{label}</h3>
      </div>
      <div className={styles.containerContent}>
        {children}
      </div>
    </div>
  );
};

// Export the memoized version
export default React.memo(Container);
