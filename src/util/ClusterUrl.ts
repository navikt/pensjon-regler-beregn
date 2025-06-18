// TODO Denne vil forsvinner når vi fjerner FSS, kan bruke URIs.ts da.

export type AppConfig = {
    cluster: 'GCP' | 'FSS';
};

let appConfig: AppConfig | null = null;

export async function loadConfig(): Promise<AppConfig> {
    if (appConfig !== null) {
        return appConfig;
    }

    const res = await fetch('/config.json');
    if (!res.ok) throw new Error('Failed to load config.json');

    const config = await res.json();
    if (config.cluster !== 'GCP' && config.cluster !== 'FSS') {
        throw new Error('Invalid cluster value in config.json');
    }

    appConfig = config as AppConfig;
    return appConfig;
}

export async function getBaseUrl(): Promise<string> {
    const config = await loadConfig();

    const baseUrls: Record<string, string> = {
        GCP: 'https://pensjon-regler-logger-dev.intern.dev.nav.no',
        FSS: 'https://pensjon-regler-logviewer-api.dev.adeo.no'
    };

    return baseUrls[config.cluster] ?? baseUrls.GCP;
}
