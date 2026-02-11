import {AuthConfiguration, ServerConfiguration} from "./types";
import dotenv from 'dotenv'
import {z} from "zod";
import fs from "node:fs";

const appEnvSchema = z.enum(['prod-gcp', 'dev-gcp']);
const appEnvParsed = appEnvSchema.safeParse(process.env.APP_ENV);

if (!appEnvParsed.success) {
    console.error("Ugyldig eller manglende APP_ENV miljøvariabel. Forventet en av: 'prod-gcp', 'dev-gcp'");
    throw new Error("Ugyldig eller manglende APP_ENV miljøvariabel");
}

const appEnv = appEnvParsed.data;
const envFile: string = appEnv === 'prod-gcp' ? '.env.prod-gcp' : '.env.dev-gcp';

if (!fs.existsSync(envFile)) {
    throw new Error(`Miljøfilen ${envFile} finnes ikke.`);
}
console.log(`Laster miljøvariabler fra fil: ${envFile}`);
dotenv.config({ path: envFile });

export const serverEnvironmentSchema = z.object({
    PORT: z.preprocess((p) => {
        if (typeof p === "string" && p.trim() !== "") return Number(p)
        return p
    }, z.number()),
    NAIS_TOKEN_ENDPOINT: z.string(),
    NAIS_TOKEN_EXCHANGE_ENDPOINT: z.string(),
    NAIS_TOKEN_INTROSPECTION_ENDPOINT: z.string(),
    ENTRA_ID_PROVIDER: z.string(),
        /* exposed by nais */
    AZURE_APP_CLIENT_ID: z.string().optional(),
    AZURE_APP_CLIENT_SECRET: z.string().optional(),
    NAIS_APP_NAME: z.string(),
    NAIS_CLUSTER_NAME: z.string(),
    NAIS_NAMESPACE: z.string(),
    PENSJON_REGLER_LOGGER_APP_URI: z.string(),
    PENSJON_REGLER_LOGGER_SCOPE: z.string(),
    PENSJON_REGLER_PROD_URI: z.string().optional(),
    PENSJON_REGLER_PROD_SCOPE: z.string().optional(),
    PENSJON_REGLER_Q0_URI: z.string().optional(),
    PENSJON_REGLER_Q0_SCOPE: z.string().optional(),
    PENSJON_REGLER_Q1_URI: z.string().optional(),
    PENSJON_REGLER_Q1_SCOPE: z.string().optional(),
    PENSJON_REGLER_Q2_URI: z.string().optional(),
    PENSJON_REGLER_Q2_SCOPE: z.string().optional(),
    PENSJON_REGLER_Q5_URI: z.string().optional(),
    PENSJON_REGLER_Q5_SCOPE: z.string().optional(),

});

const parsedSchema = serverEnvironmentSchema.safeParse(process.env);
if (!parsedSchema.success) {
    const prettyPrintedError = z.prettifyError(parsedSchema.error)
    console.error(prettyPrintedError);
    throw new Error("Ugyldige miljøvariabler: " + JSON.stringify(prettyPrintedError, null, 2));
}
const env = parsedSchema.data;

export const authConfiguration: AuthConfiguration = {
    tokenEndpoint: env.NAIS_TOKEN_ENDPOINT,
    tokenExchangeEndpoint: env.NAIS_TOKEN_EXCHANGE_ENDPOINT,
    tokenIntrospectionEndpoint: env.NAIS_TOKEN_INTROSPECTION_ENDPOINT,
    entraIdProvider: env.ENTRA_ID_PROVIDER,
    appClientId: env.AZURE_APP_CLIENT_ID,
    appClientSecret: env.AZURE_APP_CLIENT_SECRET
}

export const serverConfiguration: ServerConfiguration = {
    exposedPort: env.PORT,
    naisAppName: env.NAIS_APP_NAME,
    naisClusterName: env.NAIS_CLUSTER_NAME,
    naisNamespace: env.NAIS_NAMESPACE,
    pensjonReglerLoggerAppURI: env.PENSJON_REGLER_LOGGER_APP_URI,
    pensjonReglerLoggerScope: env.PENSJON_REGLER_LOGGER_SCOPE,
    pensjonReglerProdURI: env.PENSJON_REGLER_PROD_URI,
    pensjonReglerProdScope: env.PENSJON_REGLER_PROD_SCOPE,
    pensjonReglerQ0URI: env.PENSJON_REGLER_Q0_URI,
    pensjonReglerQ0Scope: env.PENSJON_REGLER_Q0_SCOPE,
    pensjonReglerQ1URI: env.PENSJON_REGLER_Q1_URI,
    pensjonReglerQ1Scope: env.PENSJON_REGLER_Q1_SCOPE,
    pensjonReglerQ2URI: env.PENSJON_REGLER_Q2_URI,
    pensjonReglerQ2Scope: env.PENSJON_REGLER_Q2_SCOPE,
    pensjonReglerQ5URI: env.PENSJON_REGLER_Q5_URI,
    pensjonReglerQ5Scope: env.PENSJON_REGLER_Q5_SCOPE,
    enableAccessControl: env.NAIS_CLUSTER_NAME === "dev-gcp" || env.NAIS_CLUSTER_NAME === "prod-gcp",
}

