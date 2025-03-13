import React, { useRef, useEffect } from 'react';

// This utility adds a colored border that flashes when a component re-renders
// It helps visualize unnecessary re-renders
export const highlightUpdates = (element) => {
  const HighlightUpdates = ({ element }) => {
    const ref = useRef(null);
    
    useEffect(() => {
      if (ref.current) {
        // Add flash effect on render
        ref.current.style.outline = '2px solid #ff5722';
        ref.current.style.boxShadow = '0 0 10px #ff5722';
        
        // Remove effect after animation
        const timer = setTimeout(() => {
          if (ref.current) {
            ref.current.style.outline = '1px solid #555';
            ref.current.style.boxShadow = 'none';
          }
        }, 500);
        
        return () => clearTimeout(timer);
      }
    });
    
    return (
      <div 
        ref={ref} 
        style={{ 
          transition: 'all 0.5s', 
          padding: '8px', 
          outline: '1px solid #555',
          borderRadius: '4px'
        }}
      >
        {element}
      </div>
    );
  };
  
  return <HighlightUpdates element={element}/>;
};
