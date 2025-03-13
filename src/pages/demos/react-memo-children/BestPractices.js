import React from 'react';
import styles from '@/styles/Demo.module.css';
import CodeHighlight from '@/components/CodeHighlight';

const BestPractices = () => {
  return (
    <div className={styles.bestPractices}>
      <h2>Best Practices for Children Props</h2>
      <ul>
        <li>
          <strong>Memoize Static Children</strong> - Use useMemo for children that don't depend on props or state
          <CodeHighlight code={`// Good: Memoize static children
const ParentComponent = () => {
  // Children that don't depend on any values
  const memoizedChildren = useMemo(() => (
    <>
      <ExpensiveChild label="Static Child" />
      <AnotherChild data={staticData} />
    </>
  ), []); // Empty deps = never changes

  return <Container>{memoizedChildren}</Container>;
};`} />
        </li>
        <li>
          <strong>Include Dependencies When Needed</strong> - Add dependencies to useMemo when children need dynamic values
          <CodeHighlight code={`// Good: Include necessary dependencies
const ParentComponent = ({ userId, userData }) => {
  // Children that depend on props
  const userChildren = useMemo(() => (
    <>
      <UserProfile id={userId} />
      <UserSettings data={userData} />
    </>
  ), [userId, userData]); // Re-create when these change

  return <Container>{userChildren}</Container>;
};`} />
        </li>
        <li>
          <strong>Consider Component Composition</strong> - Sometimes it's better to pass components as props
          <CodeHighlight code={`// Alternative: Component composition
const Container = React.memo(({ header, content, footer }) => (
  <div>
    <div className="header">{header}</div>
    <div className="content">{content}</div>
    <div className="footer">{footer}</div>
  </div>
));

// Usage: Pass components as props
const Parent = () => (
  <Container
    header={<Header />}
    content={<Content />}
    footer={<Footer />}
  />
);`} />
        </li>
        <li>
          <strong>Extract Complex Children</strong> - Move complex child structures to separate components
          <CodeHighlight code={`// Good: Extract complex children
const UserProfileSection = React.memo(() => (
  <>
    <UserAvatar />
    <UserInfo />
    <UserStats />
  </>
));

const ParentComponent = () => (
  <Container>
    <UserProfileSection /> {/* Already memoized */}
  </Container>
);`} />
        </li>
        
      </ul>
      
      <div className={styles.warning}>
        <h3>Performance Considerations</h3>
        <p>
          Remember that useMemo itself has a cost. Only memoize children when:
        </p>
        <ul>
          <li>The children components are expensive to render</li>
          <li>The children structure is complex or contains many elements</li>
          <li>The parent component renders frequently</li>
          <li>You've verified that re-renders are causing performance issues</li>
        </ul>
      </div>
    </div>
  );
};

export default BestPractices;
