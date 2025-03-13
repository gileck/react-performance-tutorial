import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';
import exerciseStyles from '@/styles/Exercise.module.css';

export default function InstructionsPage() {
  return (
    <>
      <Head>
        <title>Exercise Instructions - React Performance</title>
        <meta name="description" content="Instructions for the React performance optimization exercise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>React Performance Exercise - Instructions</h1>
          <div className={exerciseStyles.exerciseLinks}>
            <Link href="/exercise" className={exerciseStyles.exerciseLink}>
              <span className={exerciseStyles.linkIcon}>⬅️</span>
              Back to Exercise
            </Link>
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.markdown}>
            <h2>Overview</h2>
            <p>This exercise provides a practical opportunity to identify and fix common React performance issues. You'll work with a simulated e-commerce dashboard that contains multiple performance bottlenecks.</p>

            <h2>Your Task</h2>
            <ol>
              <li>Analyze the code and identify components that are rendering unnecessarily</li>
              <li>Use the visual re-render indicators (gray borders that flash red) to find performance issues</li>
              <li>Apply the appropriate optimization techniques to fix each issue</li>
              <li>Compare the performance before and after your optimizations</li>
            </ol>

            <h2>Getting Started</h2>
            <ol>
              <li>Run the application and interact with different parts of the dashboard</li>
              <li>Notice which components have colored borders that flash red when they re-render</li>
              <li>Pay attention to components that re-render even when their actual data hasn't changed</li>
            </ol>

            <h2>What to Look For</h2>
            <ul>
              <li>Components re-rendering when their props haven't changed</li>
              <li>Context consumers re-rendering when unrelated context values change</li>
              <li>Re-renders caused by object and function props</li>
              <li>Inefficient parent-child component relationships</li>
              <li>Unnecessary re-renders with API data</li>
            </ul>

            <h2>Tips</h2>
            <ul>
              <li>Apply the optimization techniques you've learned in the demos</li>
              <li>Remember that not every component needs optimization</li>
              <li>Focus on the components that render frequently or are expensive to render</li>
              <li>Test your optimizations to ensure they work as expected</li>
            </ul>

            <h2>Performance Issues to Find</h2>
            <p>The exercise includes examples of all the performance issues covered in the demos:</p>
            <ul>
              <li>Basic React.memo usage</li>
              <li>Object props with React.memo</li>
              <li>Function props with useCallback</li>
              <li>Children props optimization</li>
              <li>Context performance optimization</li>
              <li>API data and custom comparison functions</li>
            </ul>

            <p>Good luck!</p>
          </div>
        </div>
      </div>
    </>
  );
}
