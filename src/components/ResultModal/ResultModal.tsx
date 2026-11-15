
import styles from './ResultModal.module.css';

interface ResultModalProps {
    winner: string;
    onClose: () => void;
    onRemoveWinner: () => void;
    onSpinAgain: () => void;
}

export function ResultModal({
                                winner,
                                onClose,
                                onRemoveWinner,
                                onSpinAgain,
                            }: ResultModalProps) {
    return (
        <div
            className={styles.overlay}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="result-title"
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <div className={styles.emoji}>🎉</div>

                <p className={styles.subtitle}>Наш выбор сегодня</p>

                <h2 id="result-title">{winner}</h2>

                <p className={styles.description}>
                    Колесо приняло решение!
                </p>

                <button
                    className={styles.primaryButton}
                    onClick={onSpinAgain}
                >
                    Крутить ещё раз
                </button>

                <button
                    className={styles.secondaryButton}
                    onClick={onRemoveWinner}
                >
                    Убрать победителя
                </button>
            </section>
        </div>
    );
}
