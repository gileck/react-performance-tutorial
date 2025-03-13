import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices for React.memo with Objects</h2>
      <ul>
        <li>
          <strong>Use useMemo for object props</strong> - Wrap object props with useMemo to maintain stable references
          <CodeHighlight code={`const config = useMemo(() => ({ 
  label: "Component A",
  color: "red" 
}), []); // Empty dependency array = create once

<MemoizedComponent config={config} />`} />
        </li>
        <li>
          <strong>Define objects outside the render function</strong> - For static objects, define them outside your component
          <CodeHighlight code={`// Outside component
const STATIC_CONFIG = { 
  label: "Component A",
  color: "red"
};

// Inside component
function MyComponent() {
  return <MemoizedComponent config={STATIC_CONFIG} />;
}`} />
        </li>
        <li>
          <strong>Include dependencies in useMemo when needed</strong> - If your object depends on state or props, include them in the dependency array
          <CodeHighlight code={`const config = useMemo(() => ({
  label: \`Component \${id}\`,
  color: selectedColor,
  isActive: isSelected
}), [id, selectedColor, isSelected]); // Recreates when dependencies change`} />
        </li>
        <li>
          <strong>Consider useCallback for function props</strong> - Like objects, inline functions create new references on each render
          <CodeHighlight code={`// BAD: Creates new function on every render
<MemoizedComponent 
  onClick={() => handleItemClick(item.id)} 
/>

// GOOD: Stable function reference
const handleClick = useCallback(() => {
  handleItemClick(item.id);
}, [item.id]); // Only changes when item.id changes

<MemoizedComponent onClick={handleClick} />`} />
        </li>
        <li>
          <strong>Use custom comparison function when needed</strong> - For complex objects, provide a custom comparison function to React.memo
          <CodeHighlight code={`const MemoizedComponent = React.memo(Component, 
  (prevProps, nextProps) => {
    // Custom deep comparison for complex objects
    return (
      prevProps.config.id === nextProps.config.id &&
      prevProps.config.type === nextProps.config.type
      // Only compare the properties you care about
    );
  }
);`} />
        </li>
      </ul>
    </div>
  );
};

export default BestPractices;
