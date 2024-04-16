import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private oauthService: OAuthService, private http: HttpClient) {
        this.oauthService.configure(authConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    loginWithGitHub() {
        this.oauthService.initLoginFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    get isLoggedIn() {
        return this.oauthService.hasValidAccessToken();
    }

    getUserId() {
        return this.oauthService.getIdentityClaims()['sub'];
    }
}