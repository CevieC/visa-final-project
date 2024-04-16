import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UserProfileService } from './services/user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UserProfileService,
    HttpClientModule,
    provideAnimationsAsync(),
    provideOAuthClient(authConfig),
  ],
};