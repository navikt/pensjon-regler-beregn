// TODO Denne vil forsvinner når vi fjerner FSS, kan bruke URIs.ts da.

export type Cluster = 'GCP' | 'FSS';

export type AppConfig = {
    cluster: Cluster;
};

let appConfig: AppConfig | null = null;

const baseUrls: Record<Cluster, string> = {
    GCP: 'https://pensjon-regler-logger-dev.intern.dev.nav.no',
    FSS: 'https://pensjon-regler-logviewer-api.dev.adeo.no',
};

export async function loadConfig(): Promise<AppConfig> {
    if (appConfig !== null) {
        return appConfig;
    }

    const res = await fetch('/config.json');
    if (!res.ok) {
        throw new Error(`Failed to load config.json (status ${res.status})`);
    }

    const config = await res.json();

    if (config.cluster !== 'GCP' && config.cluster !== 'FSS') {
        throw new Error(`Invalid cluster value in config.json: ${config.cluster}`);
    }

    appConfig = config as AppConfig;
    return appConfig;
}

/**
 * Resolves base URL for the current cluster from config.
 * Loads config if not cached yet.
 */
export async function getBaseUrl(): Promise<string> {
    const config = await loadConfig();
    return baseUrls[config.cluster];
}

export async function tryLoadConfigAndLog(): Promise<void> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        const res = await fetch('/config.json', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
            console.warn('tryLoadConfigAndLog: Could not load /config.json, status:', res.status);
            return;
        }

        const config = await res.json();
        console.log('tryLoadConfigAndLog: Loaded config:', config);

    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.warn('tryLoadConfigAndLog: Fetch aborted (timeout)');
        } else {
            console.warn('tryLoadConfigAndLog: Failed to load config.json:', err.message || err);
        }
    }
}