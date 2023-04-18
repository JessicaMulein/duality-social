export interface IEnvironment {
    production: boolean;
    keycloak: {
        url: string;
        realm: string;
        clientId: string;
    }
}