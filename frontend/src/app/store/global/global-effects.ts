import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, of } from "rxjs";
import { catchError, flatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { ApplicationState } from "../../app.module";
import { RequestsManagementService } from "../../endpoint/requests-management.service";
import {
    changeLanguage,
    loadProfileSuccessful,
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    registerUser,
    registerUserFailure,
    registerUserSuccess,
    rehydrateSuccess
} from "./global-actions";

@Injectable()
export class GlobalEffects {

    constructor(private actions$: Actions,
        private store: Store<ApplicationState>,
        private modalService: BsModalService,
        private router: Router,
        private translate: TranslateService,
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
                    mergeMap(_ => this.requestsService.getUserInfo()),
                    mergeMap(response => {
                        return [
                            loadProfileSuccessful({userData: response}),
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

    onRegisterUser$ = createEffect(() => this.actions$.pipe(
        ofType(registerUser),
        switchMap((action) => {
            return this.requestsService.registerUser(action.userData)
                .pipe(
                    switchMap(response => {
                        return [
                            registerUserSuccess()
                        ]
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(registerUserFailure({ errorMessage: error.message }),
                        ))
                )
        })));

    redirectAfterUserRegister$ = createEffect(() => this.actions$.pipe(
        ofType(registerUserSuccess,
            registerUserFailure),
        switchMap(() => [
            this.router.navigate(['login'])
        ])
    ), { dispatch: false });

    onChangeLanguage$ = createEffect(() => this.actions$.pipe(
        ofType(changeLanguage),
        switchMap((action) => [
            this.translate.use(action.language)
        ])
    ), { dispatch: false });
}
