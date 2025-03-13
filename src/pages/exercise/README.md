# React Performance Optimization Exercise

## Overview
This exercise provides a practical opportunity to identify and fix common React performance issues. You'll work with a simulated e-commerce dashboard that contains multiple performance bottlenecks.

## Your Task
1. Analyze the code and identify components that are rendering unnecessarily
2. Use React DevTools Profiler or the visual re-render indicators to find performance issues
3. Apply the appropriate optimization techniques to fix each issue
4. Compare the performance before and after your optimizations

## Getting Started
1. Run the application and interact with different parts of the dashboard
2. Notice which components have colored borders that flash when they re-render
3. Pay attention to components that re-render even when their actual data hasn't changed

## What to Look For
- Components re-rendering when their props haven't changed
- Context consumers re-rendering when unrelated context values change
- Re-renders caused by object and function props
- Inefficient parent-child component relationships
- Unnecessary re-renders with API data

## Tips
- Apply the optimization techniques you've learned in the demos
- Remember that not every component needs optimization
- Focus on the components that render frequently or are expensive to render
- Test your optimizations to ensure they work as expected

Good luck!
