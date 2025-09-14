import ApiTestComponent from '@/components/ApiTestComponent';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <ApiTestComponent />
      </main>
    </div>
  );
}
