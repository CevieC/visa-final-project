import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = '${RAILWAY_PRIVATE_DOMAIN_FULL}/api';

    constructor(private oauthService: OAuthService, private http: HttpClient) {
        this.oauthService.configure(authConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    loginWithGitHub() {
        this.oauthService.initLoginFlow();
    }

    login(username: string, password: string): Observable<any> {
        const loginData = { username, password };
        return this.http.post(`${this.apiUrl}/login`, loginData);
    }

    register(username: string, email: string, password: string): Observable<any> {
        const registrationData = { username, email, password };
        return this.http.post(`${this.apiUrl}/register`, registrationData);
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