import CharacterDashboard from '@/components/CharacterDashboard';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <CharacterDashboard />
      </main>
    </div>
  );
}
