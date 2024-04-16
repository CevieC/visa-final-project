import { AuthConfig } from 'angular-oauth2-oidc';

export interface OAuthConfig extends AuthConfig {
  resourceServer: {
    allowedUrls: string[];
    sendAccessToken: boolean;
  };
}

export const authConfig: OAuthConfig = {
  issuer: 'https://github.com',
  clientId: '${GITHUB_CLIENT_ID}',
  redirectUri: '${GITHUB_REDIRECT_URI}',
  scope: 'user:email',
  resourceServer: {
    allowedUrls: ['${RAILWAY_PRIVATE_DOMAIN_FULL}'],
    sendAccessToken: true,
  },
};