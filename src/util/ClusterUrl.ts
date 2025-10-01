export function getResponseFormat(): 'xml' | 'json' {
    const cluster = import.meta.env.VITE_CLUSTER;
    return cluster === 'FSS' ? 'xml' : 'json';
}

