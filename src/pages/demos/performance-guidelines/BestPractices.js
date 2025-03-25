import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.demoSection}>
      <h2>Best Practices</h2>
      
      <div className={styles.demoContainer}>
        <div className={styles.demoSubsection}>
          <h3>When to Use Memoization</h3>
          <p>
            While following the general guidelines will reduce the need for memoization,
            there are still cases where React.memo, useMemo, and useCallback are valuable:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Expensive calculations</strong>: Use useMemo for computations that are genuinely expensive
              (e.g., complex filtering, sorting, or transforming large datasets).
            </li>
            <li>
              <strong>Preventing re-renders in large lists</strong>: Use React.memo for list items when you have
              a large number of items and re-rendering all of them causes noticeable performance issues.
            </li>
            <li>
              <strong>Stabilizing dependencies</strong>: Use useCallback for event handlers that are passed to
              memoized child components or used in dependency arrays of useEffect hooks.
            </li>
            <li>
              <strong>Optimizing context providers</strong>: Use useMemo to memoize context values to prevent
              unnecessary re-renders of all context consumers.
            </li>
          </ul>
          <p>
            Always use the React DevTools Profiler to identify actual performance bottlenecks before
            adding memoization. Premature optimization can lead to more complex code without significant benefits.
          </p>
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Code Structure for Performance</h3>
          <p>
            How you structure your code can have a significant impact on performance:
          </p>
          
          <CodeHighlight code={`// Split large components into smaller ones
// Instead of this:
function LargeComponent({ data, filters, sorting }) {
  // Lots of complex logic and UI rendering
  return (
    <div>
      {/* Complex UI with many nested components */}
    </div>
  );
}

// Prefer this:
function FilterBar({ filters, onFilterChange }) {
  // Filter-specific logic
  return <div>{/* Filter UI */}</div>;
}

function SortControls({ sorting, onSortChange }) {
  // Sorting-specific logic
  return <div>{/* Sorting UI */}</div>;
}

function DataList({ data, filters, sorting }) {
  // Data rendering logic
  return <div>{/* Data display */}</div>;
}

function Dashboard({ data, filters, sorting }) {
  return (
    <div>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <SortControls sorting={sorting} onSortChange={handleSortChange} />
      <DataList data={data} filters={filters} sorting={sorting} />
    </div>
  );
}`} />
          
          <ul className={styles.list}>
            <li>
              <strong>Split large components</strong>: Break down large components into smaller, more focused ones
              to limit the scope of re-renders.
            </li>
            <li>
              <strong>Separate business logic from UI</strong>: Keep pure business logic functions separate from UI components
              to make them easier to test and optimize.
            </li>
            <li>
              <strong>Use custom hooks</strong>: Extract complex state logic into custom hooks to improve reusability
              and make components more focused on rendering.
            </li>
            <li>
              <strong>Lazy load components</strong>: Use React.lazy and Suspense to defer loading components
              that aren't immediately needed.
            </li>
          </ul>
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Practical Tips</h3>
          
          <CodeHighlight code={`// Virtualize long lists
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div>{items[index].name}</div>
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}

// Debounce rapidly firing events
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create a debounced function that only triggers after 300ms of inactivity
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );
  
  // Update the input value immediately for responsive UI
  const handleChange = (e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}`} />
          
          <ul className={styles.list}>
            <li>
              <strong>Use keys properly</strong>: Always use stable, unique keys for list items to help React
              identify which items have changed, been added, or been removed.
            </li>
            <li>
              <strong>Virtualize long lists</strong>: For very long lists, use virtualization libraries like
              react-window or react-virtualized to only render visible items.
            </li>
            <li>
              <strong>Debounce rapidly firing events</strong>: For events like window resize, scroll, or text input,
              use debouncing to limit how often your handlers are called.
            </li>
            <li>
              <strong>Avoid anonymous functions in JSX</strong>: Define event handlers outside the render method
              or memoize them with useCallback to prevent unnecessary re-renders.
            </li>
            <li>
              <strong>Use web workers for CPU-intensive tasks</strong>: Move heavy computations off the main thread
              to keep your UI responsive.
            </li>
            <li>
              <strong>Implement code-splitting</strong>: Split your application into smaller chunks that can be
              loaded on demand to reduce initial load time.
            </li>
          </ul>
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Measuring Performance</h3>
          <p>
            Before optimizing, always measure to identify actual bottlenecks:
          </p>
          
          <CodeHighlight code={`// Using the User Timing API to measure performance
import { useState, useEffect } from 'react';

function DataProcessingComponent({ data }) {
  const [processedData, setProcessedData] = useState([]);
  
  useEffect(() => {
    // Mark the start of processing
    performance.mark('process-start');
    
    // Do some expensive data processing
    const result = processData(data);
    setProcessedData(result);
    
    // Mark the end and measure the duration
    performance.mark('process-end');
    performance.measure(
      'data-processing-time',
      'process-start',
      'process-end'
    );
    
    // Log the measurement
    const measurements = performance.getEntriesByName('data-processing-time');
    console.log('Processing took ' + measurements[0].duration + 'ms');
    
    // Clean up marks
    performance.clearMarks();
    performance.clearMeasures();
  }, [data]);
  
  return (
    <div>
      {/* Render processed data */}
    </div>
  );
}`} />
          
          <ul className={styles.list}>
            <li>
              <strong>React DevTools Profiler</strong>: Use the Profiler to record rendering performance and
              identify components that render too often or take too long to render.
            </li>
            <li>
              <strong>Performance tab in Chrome DevTools</strong>: Analyze JavaScript execution time, layout,
              and paint operations.
            </li>
            <li>
              <strong>Lighthouse</strong>: Run audits to get insights on performance, accessibility, and best practices.
            </li>
            <li>
              <strong>User Timing API</strong>: Add performance marks and measures in your code to track specific operations.
            </li>
          </ul>
          <p>
            Remember that the goal of performance optimization is to improve the user experience.
            Focus on optimizations that users will actually notice, like reducing time to interactive
            or improving responsiveness during interactions.
          </p>
        </div>
        
        <div className={styles.demoSubsection}>
          <h3>Future of React Performance</h3>
          <p>
            The React team is actively working on features that will make performance optimizations more automatic:
          </p>
          
          <CodeHighlight code={`// Using useTransition to prioritize updates
import { useState, useTransition } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (e) => {
    const newQuery = e.target.value;
    
    // Update the input immediately (high priority)
    setQuery(newQuery);
    
    // Defer the expensive search operation (low priority)
    startTransition(() => {
      const searchResults = performExpensiveSearch(newQuery);
      setResults(searchResults);
    });
  };
  
  return (
    <div>
      <input type="text" onChange={handleSearch} />
      
      {isPending ? (
        <div>Loading results...</div>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`} />
          
          <ul className={styles.list}>
            <li>
              <strong>Automatic memoization</strong>: The React team is researching ways to automatically
              memoize components and values without explicit React.memo or useMemo calls.
            </li>
            <li>
              <strong>Server Components</strong>: React Server Components allow parts of your UI to be rendered
              on the server, reducing the JavaScript sent to the client.
            </li>
            <li>
              <strong>Concurrent features</strong>: Features like useTransition and useDeferredValue help
              prioritize updates to keep your UI responsive.
            </li>
          </ul>
          <p>
            By following the principles in this guide, you'll not only improve performance today but also
            prepare your codebase to take advantage of these future optimizations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestPractices;
