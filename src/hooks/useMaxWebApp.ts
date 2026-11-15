
import { useEffect } from 'react';

export function useMaxWebApp() {
    const webApp = window.WebApp ?? null;

    const hasLaunchData = Boolean(
        webApp?.initData ||
        webApp?.platform ||
        webApp?.version
    );

    useEffect(() => {
        if (!webApp) {
            console.info('MAX Bridge не загружен');
            return;
        }

        if (!hasLaunchData) {
            console.info(
                'MAX Bridge загружен, но контекст MAX отсутствует'
            );
            return;
        }

        console.log('MAX Bridge подключен');
        console.log('Платформа:', webApp.platform);
        console.log('Версия MAX:', webApp.version);
        console.log('Устройство:', webApp.deviceName);
        console.log('Пользователь:', webApp.initDataUnsafe?.user);
    }, [webApp, hasLaunchData]);

    return {
        isMaxApp: hasLaunchData,
        webApp,
        user: webApp?.initDataUnsafe?.user ?? null,
        platform: webApp?.platform ?? null,
    };
}

