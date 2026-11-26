const LABELS: Record<string, string> = {
    "local": "Lokal",
    "pensjon-regler": "PROD",
    "pensjon-regler-verifisering": "Verifisering",
};

export const environmentLabel = (environment?: string) => {
    if (!environment) return "–";
    if (LABELS[environment]) return LABELS[environment];
    const match = environment.match(/-(q\d)$/i);
    return match ? match[1].toUpperCase() : environment;
};

export const shortClassName = (className?: string) => className?.split(".").pop() ?? "";
