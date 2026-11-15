
import { useState, type FormEvent } from 'react';
import styles from './AddOption.module.css';

interface AddOptionProps {
    onAdd: (label: string) => void;
    disabled?: boolean;
}

export function AddOption({
                              onAdd,
                              disabled = false,
                          }: AddOptionProps){
    const [value, setValue] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedValue = value.trim();

        if (!trimmedValue) return;

        onAdd(trimmedValue);
        setValue('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Добавить вариант..."
                maxLength={40}
                disabled={disabled}
            />

            <button className={styles.button} type="submit" disabled={disabled}>
                Добавить
            </button>
        </form>
    );
}
