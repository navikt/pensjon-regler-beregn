import {serverConfiguration} from "./config";

export const setPensjonReglerRequestScopeAndUrlForEnvironment = async (env: string) => {
    let requestScope: string | undefined = "";
    let requestUrl: string | undefined = "";

    switch (env) {
        case "PROD":
            requestScope = serverConfiguration.pensjonReglerProdScope;
            requestUrl = serverConfiguration.pensjonReglerProdURI;
            break;
        case "Q0":
            requestScope = serverConfiguration.pensjonReglerQ0Scope;
            requestUrl = serverConfiguration.pensjonReglerQ0URI;
            break;
        case "Q1":
            requestScope = serverConfiguration.pensjonReglerQ1Scope;
            requestUrl = serverConfiguration.pensjonReglerQ1URI;
            break;
        case "Q2":
            requestScope = serverConfiguration.pensjonReglerQ2Scope;
            requestUrl = serverConfiguration.pensjonReglerQ2URI;
            break;
        case "Q5":
            requestScope = serverConfiguration.pensjonReglerQ5Scope;
            requestUrl = serverConfiguration.pensjonReglerQ5URI;
            break;
        default:
            throw new Error(`Ukjent miljø: ${env}`);
    }

    return {requestScope, requestUrl};
    };
