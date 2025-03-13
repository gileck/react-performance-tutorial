import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';

import Introduction from './Introduction';
import ProblemDemo from './ProblemDemo';
import SolutionDemo from './SolutionDemo';
import BestPractices from './BestPractices';

export default function ReactMemoChildrenDemo() {
  return (
    <>
      <Head>
        <title>React.memo with Children | React Performance Boost</title>
        <meta name="description" content="Learn how to properly optimize React components that receive children props" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>React.memo with Children</h1>
          <p>Learn how to optimize components that receive children props</p>
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
