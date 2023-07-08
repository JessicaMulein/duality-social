import { InternalAxiosRequestConfig } from 'axios';
import keycloak from '../keycloak';

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: () => void): void => {
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

const doLogin = (): Promise<void> => keycloak.login();

const doLogout = (): Promise<void> => keycloak.logout();

const getToken = (): string | undefined => keycloak.token;

const isLoggedIn = (): boolean => !!keycloak.token;

const updateToken = (successCallback: () => Promise<InternalAxiosRequestConfig<any>>) =>
  keycloak.updateToken(5)
    .then(() => successCallback())
    .catch(doLogin);


const getUsername = (): string | undefined => keycloak.tokenParsed?.preferred_username;

const hasRole = (roles: string[]): boolean => roles.some((role) => keycloak.hasRealmRole(role));

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
};

export default UserService;