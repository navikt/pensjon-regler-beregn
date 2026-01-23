import {serverConfiguration} from "./config";

export const setPensjonReglerRequestScopeAndUrlForEnvironment = async (env: string) => {
    let requestScope: string | undefined = "";
    let requestUrl: string | undefined = "";

    switch (env) {
        case "prod":
            requestScope = serverConfiguration.pensjonReglerProdScope;
            requestUrl = serverConfiguration.pensjonReglerProdURI;
            break;
        case "q0":
            requestScope = serverConfiguration.pensjonReglerQ0Scope;
            requestUrl = serverConfiguration.pensjonReglerQ0URI;
            break;
        case "q1":
            requestScope = serverConfiguration.pensjonReglerQ1Scope;
            requestUrl = serverConfiguration.pensjonReglerQ1URI;
            break;
        case "q2":
            requestScope = serverConfiguration.pensjonReglerQ2Scope;
            requestUrl = serverConfiguration.pensjonReglerQ2URI;
            break;
        case "q5":
            requestScope = serverConfiguration.pensjonReglerQ5Scope;
            requestUrl = serverConfiguration.pensjonReglerQ5URI;
            break;
        default:
            throw new Error(`Ukjent miljø: ${env}`);
    }

    return {requestScope, requestUrl};
    };
