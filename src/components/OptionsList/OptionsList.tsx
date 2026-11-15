
import type { WheelOption } from '../../types/wheel';
import styles from './OptionsList.module.css';

interface OptionsListProps {
    options: WheelOption[];
    onRemove: (id: string) => void;
    disabled?: boolean;
}


export function OptionsList({
                                options,
                                onRemove,
                                disabled = false,
                            }: OptionsListProps) {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Варианты</h2>
                <span>{options.length}</span>
            </div>

            <ul className={styles.list}>
                {options.map((option) => (
                    <li className={styles.item} key={option.id}>
                        <span>{option.label}</span>

                        <button
                            className={styles.removeButton}
                            type="button"
                            onClick={() => onRemove(option.id)}
                            aria-label={`Удалить ${option.label}`}
                            disabled={disabled}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            {options.length === 0 && (
                <p className={styles.empty}>
                    Пока нет вариантов. Добавь первый!
                </p>
            )}
        </section>
    );
}
