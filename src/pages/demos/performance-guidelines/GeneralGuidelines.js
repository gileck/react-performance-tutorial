import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const GeneralGuidelines = () => {
  return (
    <div className={styles.demoSection}>
      <h2 className={styles.demoTitle}>General Guidelines</h2>
      
      <div className={styles.demoContainer}>
        <div className={styles.demoSubsection}>
          <h3>1. Leverage React's Component Composition</h3>
          <p>
            When a component visually wraps other components, let it accept JSX as children. 
            This way, when the wrapper component updates its own state, React knows that its 
            children don't need to re-render.
          </p>
          <CodeHighlight code={`// Instead of this:
const List = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && items.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
};

// Prefer this:
const List = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && children}
    </div>
  );
};

// Usage:
<List>
  {items.map(item => <Item key={item.id} {...item} />)}
</List>`} />
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>2. Keep State as Local as Possible</h3>
          <p>
            Prefer local state and don't lift state up any further than necessary. 
            For example, don't keep transient state like forms and whether an item is 
            hovered at the top of your tree or in a global state library.
          </p>
          <CodeHighlight code={`// Instead of this (in a parent component):
const ParentComponent = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  
  return (
    <div>
      {items.map(item => (
        <Item 
          key={item.id} 
          {...item} 
          isHovered={item.id === hoveredItemId}
          onMouseEnter={() => setHoveredItemId(item.id)}
          onMouseLeave={() => setHoveredItemId(null)}
        />
      ))}
    </div>
  );
};

// Prefer this (in the item component):
const Item = ({ id, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: isHovered ? 'lightgray' : 'white' }}
    >
      {name}
    </div>
  );
};`} />
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>3. Keep Rendering Logic Pure</h3>
          <p>
            If re-rendering a component causes a problem or produces some noticeable 
            visual artifact, it's a bug in your component! Fix the bug instead of 
            adding memoization.
          </p>
          <CodeHighlight code={`// Problematic component (impure render):
const Counter = () => {
  const [count, setCount] = useState(0);
  
  // This causes a side effect during render!
  document.title = \`Count: \${count}\`;
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};

// Fixed component (pure render with useEffect):
const Counter = () => {
  const [count, setCount] = useState(0);
  
  // Side effect moved to useEffect
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};`} />
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>4. Avoid Unnecessary Effects That Update State</h3>
          <p>
            Most performance problems in React apps are caused by chains of updates 
            originating from Effects that cause your components to render over and over.
          </p>
          <CodeHighlight code={`// Problematic pattern (update loop):
const Component = () => {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  
  // Fetches data
  useEffect(() => {
    fetchData().then(result => setData(result));
  }, []);
  
  // Processes data whenever it changes
  useEffect(() => {
    setProcessedData(data.map(item => processItem(item)));
  }, [data]); // This creates an additional render cycle
  
  return <List items={processedData} />;
};

// Better pattern (compute during render):
const Component = () => {
  const [data, setData] = useState([]);
  
  // Fetches data
  useEffect(() => {
    fetchData().then(result => setData(result));
  }, []);
  
  // Process data during render instead of in an effect
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);
  
  return <List items={processedData} />;
};`} />
        </div>
        
        {/* <div className={styles.demoSubsection}>
          <h3>5. Minimize Effect Dependencies</h3>
          <p>
            Try to remove unnecessary dependencies from your Effects. For example, 
            instead of memoization, it's often simpler to move some object or a 
            function inside an Effect or outside the component.
          </p>
          <CodeHighlight code={`// Problematic pattern (too many dependencies):
const Component = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  // This config object is recreated on every render
  const config = { 
    headers: { 'Authorization': 'Bearer token' },
    timeout: 5000
  };
  
  // This function is recreated on every render
  const fetchUserData = async () => {
    const response = await fetch(\`/api/users/\${userId}\`, config);
    return response.json();
  };
  
  // Effect depends on recreated objects/functions
  useEffect(() => {
    fetchUserData().then(data => setUser(data));
  }, [userId, fetchUserData, config]); // 😱 Too many dependencies
  
  return user ? <UserProfile user={user} /> : <Loading />;
};

// Better pattern (minimize dependencies):
const Component = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Config moved inside effect
    const config = { 
      headers: { 'Authorization': 'Bearer token' },
      timeout: 5000
    };
    
    // Function moved inside effect
    const fetchUserData = async () => {
      const response = await fetch(\`/api/users/\${userId}\`, config);
      return response.json();
    };
    
    fetchUserData().then(data => setUser(data));
  }, [userId]); // ✅ Only depends on userId
  
  return user ? <UserProfile user={user} /> : <Loading />;
};`} />
        </div> */}
      </div>
    </div>
  );
  
}; 

export default GeneralGuidelines;
