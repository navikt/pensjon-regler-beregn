import { serverConfiguration } from "../../environment/config";

export type PensjonReglerEnv = "prod" | "q0" | "q1" | "q2" | "q5";

export interface PensjonReglerTarget {
    requestScope: string;
    requestUrl: string;
    env: PensjonReglerEnv;
}

const normalizeEnv = (env: string): string => (env ?? "").trim().toLowerCase();

const isNonEmpty = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

const ENV_CONFIG: Record<
    PensjonReglerEnv,
    { scope: string | undefined; url: string | undefined }
> = {
    prod: {
        scope: serverConfiguration.pensjonReglerProdScope,
        url: serverConfiguration.pensjonReglerProdURI,
    },
    q0: {
        scope: serverConfiguration.pensjonReglerQ0Scope,
        url: serverConfiguration.pensjonReglerQ0URI,
    },
    q1: {
        scope: serverConfiguration.pensjonReglerQ1Scope,
        url: serverConfiguration.pensjonReglerQ1URI,
    },
    q2: {
        scope: serverConfiguration.pensjonReglerQ2Scope,
        url: serverConfiguration.pensjonReglerQ2URI,
    },
    q5: {
        scope: serverConfiguration.pensjonReglerQ5Scope,
        url: serverConfiguration.pensjonReglerQ5URI,
    },
};

const trimTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

export const setPensjonReglerRequestScopeAndUrlForEnvironment = (
    envRaw: string
): PensjonReglerTarget => {
    const normalized = normalizeEnv(envRaw);

    if (!normalized) {
        throw new Error("Missing environment parameter \\(env\\).");
    }

    if (!(normalized in ENV_CONFIG)) {
        const supported = Object.keys(ENV_CONFIG).join(", ");
        throw new Error(
            `Unknown environment: ${normalized}. Supported: ${supported}.`
        );
    }

    const env = normalized as PensjonReglerEnv;
    const { scope, url } = ENV_CONFIG[env];

    if (!isNonEmpty(url)) {
        throw new Error(`Missing configuration for requestUrl \\(env=${env}\\).`);
    }
    if (!isNonEmpty(scope)) {
        throw new Error(`Missing configuration for requestScope \\(env=${env}\\).`);
    }

    return {
        env,
        requestScope: scope.trim(),
        requestUrl: trimTrailingSlash(url.trim()),
    };
};
