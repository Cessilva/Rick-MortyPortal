'use client';

// import { useAppSelector } from '@/store/hooks';

import styles from './CharacterDashboard.module.css';
import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

export default function CharacterDashboard() {
  // Note: These values are available for future use in error handling or debugging
  // const { error, pagination, searchQuery } = useAppSelector(
  //   state => state.characters
  // );

  return (
    <div className={styles.characterDashboard}>
      <div className={styles.characterDashboard__mainContent}>
        <div className={styles.characterDashboard__characterViewContainer}>
          <CharacterView />
        </div>
        <div className={styles.characterDashboard__characterListContainer}>
          <CharacterList />
        </div>
      </div>
    </div>
  );
}
