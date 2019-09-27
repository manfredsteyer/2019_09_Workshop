import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private oauthService: OAuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.url.startsWith('http://www.angular.at/api/')) {
            const headers = req.headers.set('Authorization', 'Bearer ' +this.oauthService.getAccessToken());
            req = req.clone({headers});
        }

        return next.handle(req).pipe(
            //tap(resp => console.debug('resp', res))
            catchError(err => this.handleError(err))
        )
    }

    handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        
        if (err.status === 401 || err.status === 403) {
            // 401: Unauthorized
            // 403: Access denied
            this.router.navigate(['/home', {needsLogin: true}])
        }

        return throwError(err);
    }

}