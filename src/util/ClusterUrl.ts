// TODO Denne vil forsvinner når vi fjerner FSS, kan bruke URIs.ts da.

export type Cluster = 'GCP' | 'FSS';

export interface AppConfig {
    cluster: Cluster;
}

let cachedConfig: AppConfig | null = null;

const baseUrls: Record<Cluster, string> = {
    GCP: 'https://pensjon-regler-logger-dev.intern.dev.nav.no',
    FSS: 'https://pensjon-regler-logviewer-api.dev.adeo.no',
};

export async function loadConfig(): Promise<AppConfig> {
    if (cachedConfig) {
        return cachedConfig;
    }

    const response = await fetch('/config.json');

    if (!response.ok) {
        throw new Error(`Failed to load config.json (status: ${response.status})`);
    }

    const config = await response.json();

    if (config.cluster !== 'GCP' && config.cluster !== 'FSS') {
        throw new Error(`Invalid cluster value in config.json: ${config.cluster}`);
    }

    cachedConfig = config as AppConfig;
    return cachedConfig;
}

let cachedResponseFormat: 'xml' | 'json' | null = null;

export async function getResponseFormat(): Promise<'xml' | 'json'> {
    if (cachedResponseFormat) {
        return cachedResponseFormat;
    }
    const config = await loadConfig();
    console.log("getResponseFormat.config.cluster: ", config.cluster);
    cachedResponseFormat = config.cluster === 'FSS' ? 'xml' : 'json';
    return cachedResponseFormat;
}

/**
 * Get base URL for current cluster from config.
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