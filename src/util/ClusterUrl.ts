// TODO Denne vil forsvinner når vi fjerner FSS, kan bruke URIs.ts da.

export type AppConfig = {
    cluster: 'GCP' | 'FSS';
};

let appConfig: AppConfig | null = null;

export async function loadConfig(): Promise<AppConfig> {
    if (appConfig !== null) {
        console.log("loadConfig: Returning cached appConfig:", appConfig);
        return appConfig;
    }

    console.log("loadConfig: Fetching /config.json...");
    const res = await fetch('/config.json');
    if (!res.ok) {
        console.error("loadConfig: Failed to load config.json, status:", res.status);
        throw new Error('Failed to load config.json');
    }

    const config = await res.json();
    console.log("loadConfig: Loaded config:", config);

    if (config.cluster !== 'GCP' && config.cluster !== 'FSS') {
        console.error("loadConfig: Invalid cluster value in config.json:", config.cluster);
        throw new Error('Invalid cluster value in config.json');
    }

    appConfig = config as AppConfig;
    return appConfig;
}

export async function getBaseUrl(): Promise<string> {
    const config = await loadConfig();
    console.log("getBaseUrl: Using cluster:", config.cluster);

    const baseUrls: Record<string, string> = {
        GCP: 'https://pensjon-regler-logger-dev.intern.dev.nav.no',
        FSS: 'https://pensjon-regler-logviewer-api.dev.adeo.no'
    };

    const url = baseUrls[config.cluster] ?? baseUrls.FSS
    console.log("getBaseUrl: Resolved baseUrl:", url);
    return url;
}
