'use client';

import { useAppSelector } from '@/store/hooks';

import styles from './ApiTestComponent.module.css';
import CharacterList from './CharacterList';

export default function ApiTestComponent() {
  const { error, pagination, searchQuery } = useAppSelector(
    state => state.characters
  );

  return (
    <div className={styles.apiTestComponent}>
      <h2 className={styles.apiTestComponent__title}>
        Rick & Morty Character Explorer
      </h2>

      <div className={styles.apiTestComponent__infoSection}>
        <h3 className={styles.apiTestComponent__sectionTitle}>
          Application Status:
        </h3>
        <div className={styles.apiTestComponent__infoBox}>
          <p className={styles.apiTestComponent__infoText}>
            <span className={styles.apiTestComponent__infoLabel}>Error:</span>{' '}
            {error || 'None'}
          </p>
          <p className={styles.apiTestComponent__infoText}>
            <span className={styles.apiTestComponent__infoLabel}>
              Total Pages:
            </span>{' '}
            {pagination.pages}
          </p>
          <p className={styles.apiTestComponent__infoText}>
            <span className={styles.apiTestComponent__infoLabel}>
              Total Characters:
            </span>{' '}
            {pagination.count}
          </p>
          {searchQuery && (
            <p className={styles.apiTestComponent__infoText}>
              <span className={styles.apiTestComponent__infoLabel}>
                Searching for:
              </span>{' '}
              &quot;
              {searchQuery}&quot;
            </p>
          )}
        </div>
      </div>

      <CharacterList />
    </div>
  );
}
