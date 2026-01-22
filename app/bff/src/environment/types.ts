export type AuthConfiguration = {
    tokenEndpoint: string;
    tokenExchangeEndpoint: string;
    tokenIntrospectionEndpoint: string;
    entraIdProvider: string;
    appClientId?: string;
    appClientSecret?: string;
};

export type ServerConfiguration = {
    exposedPort: Number;
    naisAppName: string;
    naisClusterName: string;
    naisNamespace: string;
    pensjonReglerLoggerAppURI: string;
    pensjonReglerLoggerScope: string;
    pensjonReglerProdURI?: string;
    pensjonReglerProdScope?: string;
    pensjonReglerQ0URI?: string;
    pensjonReglerQ0Scope?: string;
    pensjonReglerQ1URI?: string;
    pensjonReglerQ1Scope?: string;
    pensjonReglerQ2URI?: string;
    pensjonReglerQ2Scope?: string;
    pensjonReglerQ5URI?: string;
    pensjonReglerQ5Scope?: string;
    enableAccessControl: boolean;
}
