import {Component} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) { 

    oauthService.configure(authConfig);

    // tryLogin: Step 2
    oauthService.loadDiscoveryDocumentAndTryLogin();

  }
}

