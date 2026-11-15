
import { useMaxWebApp } from '../../hooks/useMaxWebApp';
import styles from './MaxBridgeInfo.module.css';

export function MaxBridgeInfo() {
    const { isMaxApp, user, platform } = useMaxWebApp();

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>MAX Bridge</h2>

            <p className={styles.text}>
                Статус: {isMaxApp ? 'Подключен' : 'Обычный браузер'}
            </p>

            {isMaxApp && (
                <>
                    <p className={styles.text}>Платформа: {platform}</p>
                    <p className={styles.text}>
                        Пользователь: {user?.first_name ?? 'Не определён'}
                    </p>
                    {user?.username && (
                        <p className={styles.text}>@{user.username}</p>
                    )}
                </>
            )}
        </section>
    );
}
