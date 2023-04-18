import Keycloak from 'keycloak-js';
import { environment } from './environments/environment';

const keycloakConfig = {
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
