

import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({providedIn: 'root'})
export class AuthService {

    get userName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims['given_name'];
    }

    constructor(private oauthService: OAuthService) { }

    login(): void {
        this.oauthService.initImplicitFlow();
    }

    logout(): void {
        this.oauthService.logOut();
    }
}