import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RequestsManagementService } from '../requests-management.service';
import { ApplicationState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { logoutRequest } from 'src/app/store/global/global-actions';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private requestService: RequestsManagementService,
        private router: Router,
        private store: Store<ApplicationState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                null, (err: HttpErrorResponse) => {
                    if (err.status === 401 && err.url && !err.url.includes('register-user')) {
                        this.store.dispatch(logoutRequest());
                    }
                })
        );
    }
}
