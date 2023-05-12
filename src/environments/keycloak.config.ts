/**
 * Here you can add the configuration related to keycloak
 * So we can use this common config for diffrent environment
 */
 import { KeycloakConfig } from 'keycloak-js';

 const keycloakConfig: KeycloakConfig = {
   //url: 'http://18.189.217.89:8080/auth/',
   url: 'http://177.242.201.2:8480',
   realm: 'lks-core',
   clientId: 'lks-core-demo'
 };
 
 export default keycloakConfig;