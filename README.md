This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# React Performance Boost

A comprehensive learning resource for mastering React performance optimization techniques. This project contains interactive demos and practical exercises that demonstrate common performance issues and their solutions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the App

The application is divided into two main sections:

### Demos

Each demo focuses on a specific React performance optimization technique:

1. **React.memo** - Learn how to prevent unnecessary re-renders with React.memo
   - Demonstrates basic usage of React.memo
   - Shows visual indicators when components re-render
   - Includes best practices and real-world examples

2. **React.memo with Objects** - Understand how React.memo works with object props
   - Demonstrates why React.memo fails with inline object props (shallow comparison)
   - Shows how to use useMemo to create stable object references
   - Includes practical examples of optimizing components with object props

3. **useCallback** - Learn how to optimize function props
   - Demonstrates how inline functions cause re-renders despite React.memo
   - Shows how to use useCallback to maintain stable function references
   - Includes interactive examples with visual re-render indicators

4. **React.memo with Children** - Optimize components that receive children props
   - Demonstrates why React.memo alone isn't enough for components with children
   - Shows how to use useMemo to maintain stable references for children
   - Includes best practices for component composition

5. **Context Performance** - Master React Context optimization
   - Demonstrates common performance issues with Context
   - Shows how to split contexts by concern and memoize values
   - Includes interactive demos with visual performance comparison

Each demo includes:
- Interactive examples showing the problem and solution
- Visual indicators (border highlights) when components re-render
- Comprehensive best practices section
- Real-world application examples

### Exercise

The exercise section allows you to practice identifying and fixing performance issues using the techniques learned in the demos:

1. Navigate to the exercise page from the home screen
2. Components with performance issues have a gray border that flashes red when they re-render
3. Use the "Exercise Instructions" link to view detailed instructions
4. Implement the optimizations based on what you've learned
5. Check your solutions against the provided "Solutions" page

## Performance Optimization Techniques Covered

- Using React.memo to prevent unnecessary re-renders
- Working with object props and shallow comparison
- Maintaining stable function references with useCallback
- Optimizing components with children props
- Splitting and optimizing React Context
- Handling API data efficiently with memoization
- Deep comparison techniques for complex data structures

