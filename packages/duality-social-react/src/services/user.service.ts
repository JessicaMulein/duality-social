import { InternalAxiosRequestConfig } from 'axios';
import keycloak from '../keycloak';

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
export const initKeycloak = (onAuthenticatedCallback: () => void): void => {
    keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated: boolean) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);
};

export const doLogin = (): Promise<void> => keycloak.login();

export const doLogout = (): Promise<void> => keycloak.logout();

export const doRegister = (): Promise<void> => keycloak.register();

export const getToken = (): string | undefined => keycloak.token;

export const isLoggedIn = (): boolean => !!keycloak.token;

export const updateToken = (successCallback: () => Promise<InternalAxiosRequestConfig<any>>) =>
  keycloak.updateToken(5)
    .then(() => successCallback())
    .catch(doLogin);


export const getUsername = (): string | undefined => keycloak.tokenParsed?.preferred_username;

export const hasRole = (roles: string[]): boolean => roles.some((role) => keycloak.hasRealmRole(role));

export const isAdmin = (): boolean => hasRole(['admin']);