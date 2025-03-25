import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const demos = [
    {
      id: "react-memo",
      title: "1. React.memo",
      description: "Learn how to optimize component rendering with React.memo to prevent unnecessary re-renders",
      path: "/demos/react-memo"
    },
    {
      id: "react-memo-2",
      title: "2. React.memo with Objects",
      description: "Learn how to properly use React.memo with object props to prevent unnecessary re-renders",
      path: "/demos/react-memo-2"
    },
    {
      id: "use-callback",
      title: "3. useCallback",
      description: "Learn how to prevent unnecessary re-renders caused by function props using useCallback",
      path: "/demos/use-callback"
    },
    {
      id: "react-memo-children",
      title: "4. React.memo with Children",
      description: "Learn how to properly optimize components that receive children props using React.memo and useMemo",
      path: "/demos/react-memo-children"
    },
    {
      id: "context-performance",
      title: "5. Context Performance",
      description: "Learn how to optimize React Context and prevent unnecessary re-renders by splitting contexts and memoizing values",
      path: "/demos/context-performance"
    },
    {
      id: "performance-guidelines",
      title: "6. General Guidelines",
      description: "General React performance guidelines and best practices that can reduce the need for explicit memoization",
      path: "/demos/performance-guidelines"
    },
    {
      id: "exercise",
      title: "Performance Exercise",
      description: "Practice identifying and fixing real-world React performance issues using the techniques from all demos",
      path: "/exercise"
    }
    // More demos will be added here
  ];

  return (
    <>
      <Head>
        <title>React Performance Boost - Tutorials</title>
        <meta name="description" content="Learn advanced React concepts with practical demos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>React Performance Boost</h1>
          <p className={styles.description}>
            A collection of tutorials and demos to help you master React performance optimization
          </p>
        </div>
        
        <div className={styles.grid}>
          {demos.map((demo) => (
            <Link 
              href={demo.path} 
              key={demo.id}
              className={styles.card}
            >
              <h2>{demo.title}</h2>
              <p>{demo.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
