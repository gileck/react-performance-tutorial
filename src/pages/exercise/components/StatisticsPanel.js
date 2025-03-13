import React, { memo } from 'react';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

// Problem: This component is memoized with React.memo,
// but it still re-renders unnecessarily because it receives new children references on each render
const StatisticsPanel = memo(({ children }) => {
  console.log('StatisticsPanel rendering');
  
  return highlightUpdates(
    <div className={styles.statisticsPanel}>
      {children}
    </div>
  );
});

StatisticsPanel.displayName = 'StatisticsPanel';

export default StatisticsPanel;
