import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';

// Import components
import GeneralGuidelines from './GeneralGuidelines';

export default function PerformanceGuidelines() {
  return (
    <>
      <Head>
        <title>React Performance Guidelines | React Performance Boost</title>
        <meta name="description" content="General React performance guidelines and best practices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>React Performance Guidelines</h1>
          <p>General principles for writing efficient React code</p>
          <Link href="/" className={styles.backLink}>
            &larr; Back to Home
          </Link>
        </div>
        
        <div className={styles.demoWrapper}>
          <GeneralGuidelines />
        </div>
      </main>
    </>
  );
}
