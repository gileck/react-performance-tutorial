import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';

// Import components from their separate files
import Introduction from './Introduction';
import ProblemDemo from './ProblemDemo';
import SolutionDemo from './SolutionDemo';
import BestPractices from './BestPractices';

// Main demo page component
export default function UseCallbackDemo() {
  return (
    <>
      <Head>
        <title>useCallback Demo | React Performance Boost</title>
        <meta name="description" content="Learn how to optimize component rendering with useCallback" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>useCallback Demo</h1>
          <p>Learn how to prevent unnecessary re-renders caused by function props</p>
          <Link href="/" className={styles.backLink}>
            &larr; Back to Home
          </Link>
        </div>
        
        <div className={styles.demoWrapper}>
          <Introduction />
          <ProblemDemo />
          <SolutionDemo />
          <BestPractices />
        </div>
      </main>
    </>
  );
}
