import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError, flatMap, mergeMap, switchMap, tap } from "rxjs/operators";
import { ApplicationState } from "../../app.module";
import { RequestsManagementService } from "../../endpoint/requests-management.service";
import {
    activateAccount,
    activateAccountFailure,
    activateAccountSuccess,
    changeLanguage,
    globalError,
    globalSuccess,
    loadProfile,
    loadProfileFailure,
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
        private toastr: ToastrService,
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

    showToastrError$ = createEffect(() => this.actions$.pipe(
        ofType(globalError),
        tap((action) => {
            const errorMessage = this.translate.instant(action.error);
            this.modalService.hide(1);
            this.toastr.error(errorMessage, 'FAILED');
        })
    ), { dispatch: false });

    showToastrSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(globalSuccess),
        tap(action => {
            const successMessage = action.message ? this.translate.instant(action.message) : 'Completed successfully';
            this.modalService.hide(1);
            this.toastr.success(successMessage, 'SUCCESS');
        })
    ), { dispatch: false });

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
                            loadProfileSuccessful({ userData: response }),
                            loginSuccess({})
                        ]
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(loginFailure({ errorMessage: error.message }),
                        ))
                )
        })));

    loadUserData$ = createEffect(() => this.actions$.pipe(
        ofType(loadProfile),
        switchMap((action) => {
            return this.requestsService.getUserInfo()
                .pipe(
                    switchMap(response => {
                        return [
                            loadProfileSuccessful({ userData: response })
                        ]
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(loadProfileFailure({ errorMessage: error.message }),
                        ))
                )
        })));

    loadProfileAfterRehydrate$ = createEffect(() => this.actions$.pipe(
        ofType(rehydrateSuccess),
        mergeMap(() => [
            loadProfile()
        ])
    ));

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
                            globalError({ error: 'global-errors.user-register-failure' })
                        ))
                )
        })));

    redirectAfterUserRegister$ = createEffect(() => this.actions$.pipe(
        ofType(registerUserSuccess,
            registerUserFailure,
            activateAccountSuccess,
            activateAccountFailure),
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

    onActivateAccount$ = createEffect(() => this.actions$.pipe(
        ofType(activateAccount),
        switchMap((action) => {
            return this.requestsService.activateAccount(action.activationKey)
                .pipe(
                    switchMap(response => {
                        return [
                            activateAccountSuccess()
                        ]
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(activateAccountFailure({ errorMessage: error.message }),
                            globalError({ error: 'global-errors.account-activation-failure' })
                        ))
                )
        })));

    onActivateProfileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(activateAccountSuccess),
        mergeMap(() => [
            globalSuccess({ message: 'global-success.account-activated-success' })
        ])
    ));
}
