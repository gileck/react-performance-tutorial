import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Demo.module.css';
import exerciseStyles from '@/styles/Exercise.module.css';
import Dashboard from './components/Dashboard';
import { AppProvider } from './components/AppContext';

export default function ExercisePage() {
  return (
    <>
      <Head>
        <title>React Performance Exercise</title>
        <meta name="description" content="Practice identifying and fixing React performance issues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>React Performance Exercise</h1>
          <p>
            This exercise contains multiple performance issues for you to identify and fix.
            Components with performance issues will have a gray border that flashes red when they re-render.
          </p>
          <div className={exerciseStyles.exerciseLinks}>
            <Link href="/" className={exerciseStyles.exerciseLink}>
              <span className={exerciseStyles.linkIcon}>🏠</span>
              Back to Home
            </Link>
            <a href="#" 
               onClick={(e) => {
                 e.preventDefault();
                 window.open('/exercise/instructions', '_blank');
               }}
               className={exerciseStyles.exerciseLink}
            >
              <span className={exerciseStyles.linkIcon}>📋</span>
              Exercise Instructions
            </a>
            <a href="#" 
               onClick={(e) => {
                 e.preventDefault();
                 window.open('/exercise/solutions', '_blank');
               }}
               className={exerciseStyles.exerciseLink}
            >
              <span className={exerciseStyles.linkIcon}>✅</span>
              Solutions
            </a>
          </div>
        </div>
        
        <div className={styles.content}>
          <AppProvider>
            <Dashboard />
          </AppProvider>
        </div>
      </div>
    </>
  );
}
