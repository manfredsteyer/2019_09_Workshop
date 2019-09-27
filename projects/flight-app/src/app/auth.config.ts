import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
    // Wo Identity?
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

    // Wer bin ich?
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo',
    
    // was will der Client im Namen des Benutzers machen?
  scope: 'openid profile email voucher',
}