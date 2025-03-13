import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';

import Introduction from './Introduction';
import ProblemDemo from './ProblemDemo';
import SolutionDemo from './SolutionDemo';
import BestPractices from './BestPractices';

export default function ContextPerformanceDemo() {
  return (
    <>
      <Head>
        <title>Context Performance | React Performance Boost</title>
        <meta name="description" content="Learn how to optimize React Context performance and prevent unnecessary re-renders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Context Performance</h1>
          <p>Learn how to optimize React Context and prevent unnecessary re-renders</p>
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
