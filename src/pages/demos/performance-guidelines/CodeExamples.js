import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

export const CodeExamples = () => {
  return (
    <div className={styles.demoSection}>
      <h2 className={styles.demoTitle}>Code Examples</h2>
      
      <div className={styles.demoContainer}>
        <div className={styles.demoSubsection}>
          <h3>Example 1: Optimizing Lists with Component Composition</h3>
          <p>
            This example demonstrates how to optimize a list rendering by using component composition
            and keeping state local to each item.
          </p>
          <CodeHighlight code={`// components/TodoList.js
import { useState } from 'react';

// TodoItem component with local state
export const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  
  // State is local to each item
  return (
    <li>
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {text}
        </span>
      )}
    </li>
  );
};

// TodoList uses component composition
export const TodoList = ({ todos }) => {
  // When this state changes, only TodoList re-renders
  // The individual TodoItem components don't re-render
  const [filter, setFilter] = useState('all');
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });
  
  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};`} />
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Example 2: Calculating Derived State During Render</h3>
          <p>
            Instead of using effects to calculate derived state, compute values during render
            to avoid unnecessary re-render cycles.
          </p>
          <CodeHighlight code={`// components/ProductList.js
import { useState, useMemo } from 'react';

export const ProductList = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Calculate derived data during render instead of in an effect
  const displayedProducts = useMemo(() => {
    // First filter by category
    const filtered = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
    
    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  }, [products, selectedCategory, sortBy]);
  
  // Categories are also derived during render
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['all', ...uniqueCategories];
  }, [products]);
  
  return (
    <div>
      <div>
        <label>
          Category:
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Sort by:
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>
      
      <ul>
        {displayedProducts.map(product => (
          <li key={product.id}>
            {product.name} - {'$' + product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};`} />
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Example 3: Avoiding Effect Chains</h3>
          <p>
            This example shows how to avoid creating chains of effects that cause multiple re-renders.
          </p>
          <CodeHighlight code={`// components/UserDashboard.js
import { useState, useEffect, useMemo } from 'react';

// Problematic implementation with effect chains
export const ProblematicDashboard = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  
  // First effect fetches user
  useEffect(() => {
    fetch('/api/users/' + userId)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);
  
  // Second effect depends on user and fetches posts
  useEffect(() => {
    if (user) {
      fetch('/api/users/' + user.id + '/posts')
        .then(res => res.json())
        .then(data => setPosts(data));
    }
  }, [user]); // This causes another render cycle
  
  // Third effect depends on posts and fetches comments
  useEffect(() => {
    if (posts.length > 0) {
      const postIds = posts.map(post => post.id).join(',');
      fetch('/api/comments?postIds=' + postIds)
        .then(res => res.json())
        .then(data => setComments(data));
    }
  }, [posts]); // This causes yet another render cycle
  
  // This component will render at least 4 times!
  return (
    <div>
      {/* Dashboard UI */}
    </div>
  );
};

// Optimized implementation that avoids effect chains
export const OptimizedDashboard = ({ userId }) => {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    posts: [],
    comments: []
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Single effect that loads all data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch user
        const userResponse = await fetch('/api/users/' + userId);
        const user = await userResponse.json();
        
        // Fetch posts
        const postsResponse = await fetch('/api/users/' + user.id + '/posts');
        const posts = await postsResponse.json();
        
        // Fetch comments if there are posts
        let comments = [];
        if (posts.length > 0) {
          const postIds = posts.map(post => post.id).join(',');
          const commentsResponse = await fetch('/api/comments?postIds=' + postIds);
          comments = await commentsResponse.json();
        }
        
        // Update all data at once
        setDashboardData({ user, posts, comments });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [userId]); // Only depends on userId
  
  // Derived data calculated during render
  const postsByCategory = useMemo(() => {
    const result = {};
    dashboardData.posts.forEach(post => {
      const category = post.category || 'Uncategorized';
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(post);
    });
    return result;
  }, [dashboardData.posts]);
  
  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }
  
  return (
    <div>
      {/* Dashboard UI using dashboardData and postsByCategory */}
    </div>
  );
};`} />
        </div>
      </div>
    </div>
  );
};

export default CodeExamples;
