import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices for useCallback</h2>
      <ul>
        <li>
          <strong>Only use when needed</strong> - useCallback has its own overhead, use it only when necessary
          <CodeHighlight code={`// DON'T use useCallback for components that aren't memoized
const SimpleComponent = () => {
  // This useCallback is unnecessary
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  return <button onClick={handleClick}>Click me</button>;
};

// DO use useCallback with memoized components
const MemoizedComponent = React.memo(({ onAction }) => {
  return <button onClick={onAction}>Click me</button>;
});

const Parent = () => {
  // This useCallback is useful
  const handleAction = useCallback(() => {
    console.log('action');
  }, []);
  return <MemoizedComponent onAction={handleAction} />;
};`} />
        </li>
        <li>
          <strong>Include necessary dependencies</strong> - Make sure to include all values the callback uses
          <CodeHighlight code={`// BAD: Missing dependency
const [count, setCount] = useState(0);
const handleUpdate = useCallback(() => {
  setCount(count + 1); // count is missing from deps
}, []); 

// GOOD: Include all dependencies
const handleUpdate = useCallback(() => {
  setCount(count + 1);
}, [count]); 

// BETTER: Use functional updates to avoid dependencies
const handleUpdate = useCallback(() => {
  setCount(c => c + 1); // No need for count dependency
}, []);`} />
        </li>
        <li>
          <strong>Consider extracting complex callbacks</strong> - Move complex logic outside the component
          <CodeHighlight code={`// Complex logic outside component
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

function ShoppingCart({ items }) {
  // Simple callback that uses external function
  const handleCalculate = useCallback(() => {
    return calculateTotal(items);
  }, [items]);
  
  return <MemoizedTotalDisplay onCalculate={handleCalculate} />;
}`} />
        </li>
        <li>
          <strong>Combine with useMemo for object parameters</strong> - When callbacks need object parameters
          <CodeHighlight code={`const Parent = () => {
  const [user, setUser] = useState({ id: 1, name: 'John' });
  
  // Memoize the config object
  const config = useMemo(() => ({
    userId: user.id,
    action: 'update'
  }), [user.id]);
  
  // Use memoized config in callback
  const handleAction = useCallback(() => {
    processAction(config);
  }, [config]); // Only changes when config changes
  
  return <MemoizedChild onAction={handleAction} />;
};`} />
        </li>
        <li>
          <strong>Use with event handlers carefully</strong> - Consider if memoization is worth it
          <CodeHighlight code={`// Probably overkill for simple event handlers
const SimpleButton = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click me</button>
));

// More reasonable for expensive components or complex handlers
const ExpensiveChart = React.memo(({ onDataPoint }) => {
  // Complex chart rendering...
  return <div onClick={onDataPoint}>{/* Chart */}</div>;
});

const Parent = () => {
  // Worth memoizing because ExpensiveChart is heavy
  const handleDataPoint = useCallback((point) => {
    // Complex data processing...
  }, []);
  
  return <ExpensiveChart onDataPoint={handleDataPoint} />;
};`} />
        </li>
      </ul>
    </div>
  );
};

export default BestPractices;
