import styles from './TestComponent.module.css';

interface TestComponentProps {
  title?: string;
  description?: string;
}

export default function TestComponent({
  title = 'CSS Modules Test',
  description = 'Test component CSS Modules functionality in Next.js with TypeScript.',
}: TestComponentProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.button} type="button">
        Click me!
      </button>
    </div>
  );
}
