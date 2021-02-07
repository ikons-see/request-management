import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { catchError, map, switchMap, tap, withLatestFrom, mergeMap, flatMap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { ApplicationState } from "../app.module";
import { RequestsManagementService } from "../endpoint/requests-management.service";
import {
    addNewRequest,
    addRequestFailure,
    addRequestFilters,
    addRequestSuccess,
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    closeRequest,
    closeRequestFailure,
    closeRequestSuccess,
    deleteRequest,
    deleteRequestFailure,
    deleteRequestSuccess,
    openAddRequestModal,
    openCloseRequestModal,
    openDeleteRequestModal,
    openEditRequestModal,
    openViewDetailsModal,
    rehydrateSuccess,
    requestData,
    resetRequestFilters,
    setData,
    setDataFailure,
    updateRequest,
    updateRequestFailure,
    updateRequestSuccess
} from "./requests-actions";
import { globalModalConfig } from "../types/data-types";
import { ViewDetailsModalComponent } from "../pages/requester/view-details-modal/view-details-modal.component";
import { AddRequestModalComponent } from "../pages/requester/add-request-modal/add-request-modal.component";
import { EditDetailsModalComponent } from "../pages/requester/edit-details-modal/edit-details-modal.component";
import { DeleteRequestModalComponent } from "../pages/requester/delete-request-modal/delete-request-modal.component";
import { getCurrentPage } from "./requests-reducer";
import { CloseRequestModalComponent } from "../pages/requester/close-request-modal/close-request-modal.component";
import { Router } from "@angular/router";
import { getFilters } from "./requests-reducer";


@Injectable()
export class RequestsManagementEffects {

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

    onRequestData$ = createEffect(() => this.actions$.pipe(
        ofType(requestData),
        withLatestFrom(this.store.select(getFilters)),
        switchMap(([action, filters]) => {
            return this.requestsService.getRequestsList(action.page, filters)
                .pipe(
                    map(res => setData({
                        totalNumber: res.total,
                        requests: res.requestResponses
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(setDataFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));

    openViewDetailsModal$ = createEffect(() => this.actions$.pipe(
        ofType(openViewDetailsModal),
        tap((action) => {
            this.modalService.show(ViewDetailsModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    title: 'View details for request #'
                }
            });
        })
    ), { dispatch: false });

    openAddRequestModal$ = createEffect(() => this.actions$.pipe(
        ofType(openAddRequestModal),
        tap((action) => {
            this.modalService.show(AddRequestModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    title: 'Add Request'
                }
            });
        })
    ), { dispatch: false });

    onAddNewRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addNewRequest),
        switchMap((action) => {
            return this.requestsService.addNewRequest(action.requestData)
                .pipe(
                    mergeMap(res => [
                        addRequestSuccess(),
                        requestData({ page: 1 })
                    ]),
                    catchError((error: HttpErrorResponse) =>
                        of(addRequestFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));

    closeAddRequestModal$ = createEffect(() => this.actions$.pipe(
        ofType(
            addRequestSuccess,
            updateRequestSuccess,
            deleteRequestSuccess,
            deleteRequestFailure,
            closeRequestSuccess,
            closeRequestFailure),
        tap(() => {
            this.modalService.hide();
        })
    ), { dispatch: false });


    openEditRequestModal$ = createEffect(() => this.actions$.pipe(
        ofType(openEditRequestModal),
        tap((action) => {
            this.modalService.show(EditDetailsModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    title: 'Edit Request #'
                }
            });
        })
    ), { dispatch: false });

    onRequestUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(updateRequest),
        withLatestFrom(this.store.select(getCurrentPage)),
        switchMap(([action, page]) => {
            return this.requestsService.updateRequest(action.request)
                .pipe(
                    mergeMap(res => [
                        updateRequestSuccess(),
                        requestData({ page: page })]),
                    catchError((error: HttpErrorResponse) =>
                        of(updateRequestFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));

    onFiltersApplied$ = createEffect(() => this.actions$.pipe(
        ofType(addRequestFilters),
        map((action) => {
            return requestData({page: 1})
        })
    ));

    onFiltersResetd$ = createEffect(() => this.actions$.pipe(
        ofType(resetRequestFilters),
        map((action) => {
            return requestData({page: 1})
        })
    ));


    openDeleteRequestModal$ = createEffect(() => this.actions$.pipe(
        ofType(openDeleteRequestModal),
        tap((action) => {
            this.modalService.show(DeleteRequestModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    title: 'Delete Request #'
                }
            });
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

    rehydrateFunction(): Observable<any> {
        const item = localStorage.getItem('authenticated');
        if (item) {
            return of(rehydrateSuccess());
        } else {
            return of();
        }
    }

    onDeleteRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteRequest),
        withLatestFrom(this.store.select(getCurrentPage)),
        switchMap(([action, page]) => {
            return this.requestsService.deleteRequest(action.requestId)
                .pipe(
                    mergeMap(res => [
                        deleteRequestSuccess(),
                        requestData({ page: page })
                    ]),
                    catchError((error: HttpErrorResponse) =>
                        of(deleteRequestFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));


    openCloseRequestModal$ = createEffect(() => this.actions$.pipe(
        ofType(openCloseRequestModal),
        tap((action) => {
            this.modalService.show(CloseRequestModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    title: 'Close Request #'
                }
            });
        })
    ), { dispatch: false });

    onCloseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(closeRequest),
        withLatestFrom(this.store.select(getCurrentPage)),
        switchMap(([action, page]) => {
            return this.requestsService.closeRequest(action.requestId)
                .pipe(
                    mergeMap(res => [
                        closeRequestSuccess(),
                        requestData({ page: page })
                    ]),
                    catchError((error: HttpErrorResponse) =>
                        of(closeRequestFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));
}
