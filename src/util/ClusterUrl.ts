// TODO Denne vil forsvinner når vi fjerner FSS, kan bruke URIs.ts da.

export function getResponseFormat(): 'xml' | 'json' {
    const cluster = import.meta.env.VITE_CLUSTER;
    return cluster === 'FSS' ? 'xml' : 'json';
}

export function getBaseUrl(): string {
    const cluster = import.meta.env.VITE_CLUSTER as 'GCP' | 'FSS';
    const baseUrls: Record<'GCP' | 'FSS', string> = {
        GCP: 'https://pensjon-regler-logger-dev.intern.dev.nav.no',
        FSS: 'https://pensjon-regler-logviewer-api.dev.adeo.no',
    };
    return baseUrls[cluster] || baseUrls.FSS;
}
