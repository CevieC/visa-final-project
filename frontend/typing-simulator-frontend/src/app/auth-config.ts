import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export interface OAuthConfig extends AuthConfig {
  resourceServer: {
    allowedUrls: string[];
    sendAccessToken: boolean;
  };
}

export const authConfig: OAuthConfig = {
  issuer: 'https://github.com',
  clientId: environment.github_client_id,
  redirectUri: environment.github_client_id,
  scope: 'user:email',
  resourceServer: {
    allowedUrls: [environment.apiUrl],
    sendAccessToken: false,
  },
};