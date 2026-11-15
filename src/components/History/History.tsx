
import type { WheelResult } from '../../types/wheel';
import styles from './History.module.css';

interface HistoryProps {
    results: WheelResult[];
    onClear: () => void;
}

export function History({ results, onClear }: HistoryProps) {
    if (results.length === 0) return null;

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>История</h2>

                <button onClick={onClear} type="button">
                    Очистить
                </button>
            </div>

            <ul className={styles.list}>
                {results.map((result, index) => (
                    <li key={result.id} className={styles.item}>
            <span className={styles.number}>
              {results.length - index}
            </span>

                        <span className={styles.label}>
              {result.option.label}
            </span>

                        <time className={styles.date}>
                            {new Date(result.createdAt).toLocaleTimeString(
                                'ru-RU',
                                { hour: '2-digit', minute: '2-digit' }
                            )}
                        </time>
                    </li>
                ))}
            </ul>
        </section>
    );
}
