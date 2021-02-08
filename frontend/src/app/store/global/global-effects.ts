import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { ApplicationState } from "../../app.module";
import { RequestsManagementService } from "../../endpoint/requests-management.service";
import { loginFailure, loginRequest, loginSuccess, logoutRequest, rehydrateSuccess } from "./global-actions";

@Injectable()
export class GlobalEffects {

    constructor(private actions$: Actions,
        private store: Store<ApplicationState>,
        private modalService: BsModalService,
        private router: Router,
        private requestsService: RequestsManagementService) {
    }

    rehydrateSession$ = createEffect(() => this.actions$.pipe(
        ofType('@ngrx/effects/init'),
        switchMap(() => this.rehydrateFunction())
    ));

    rehydrateFunction(): Observable<any> {
        const item = localStorage.getItem('authenticated');
        if (item) {
            return of(rehydrateSuccess());
        } else {
            return of();
        }
    }

    processLoginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap((action) => {
            const username = action.username;
            const password = action.password;
            const remember = action.rememberMe;
            return this.requestsService.requestToken(username, password, remember)
                .pipe(
                    mergeMap(response => {
                        return [
                            loginSuccess({})
                        ]
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(loginFailure({ errorMessage: error.message }),
                        ))
                )
        })));

    forceRedirectToAppliation$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        switchMap(() => this.router.navigate(['/app']))
    ), { dispatch: false });

    onLogoutRequest$ = createEffect(() => this.actions$.pipe(
        ofType(logoutRequest),
        switchMap(() => [
            this.router.navigate(['login']),
            this.requestsService.removeToken()
        ])
    ), { dispatch: false });

}