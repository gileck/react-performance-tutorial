import React, { memo } from 'react';
import { highlightUpdates } from './utils';
import styles from '@/styles/Exercise.module.css';

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
