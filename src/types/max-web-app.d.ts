interface MaxWebApp {
    initData: string | null;
    initDataUnsafe: MaxInitData | null;
    platform: 'ios' | 'android' | 'desktop' | 'web' | null;
    version: string | null;
    deviceName: string | null;
}
