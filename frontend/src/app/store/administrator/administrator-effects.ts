import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { ChangeStatusModalComponent } from "src/app/pages/administrator/admin-requests/change-status-modal/change-status-modal.component";
import { ApplicationState } from "../../app.module";
import { RequestsManagementService } from "../../endpoint/requests-management.service";
import { ViewDetailsModalComponent } from "../../pages/requester/view-details-modal/view-details-modal.component";
import { globalModalConfig } from "../../types/data-types";
import {
    addRequestFilters,
    changeRequestFailure,
    changeRequestStatus,
    changeRequestSuccess,
    openChangeStatusModal,
    openViewDetailsModal,
    requestData,
    resetRequestFilters,
    setData,
    setDataFailure
} from "./administrator-actions";
import { getCurrentPage, getFilters, getRequestById } from "./administrator-reducer";

@Injectable()
export class AdministratorEffects {

    constructor(private actions$: Actions,
        private store: Store<ApplicationState>,
        private modalService: BsModalService,
        private router: Router,
        private requestsService: RequestsManagementService) {
    }

    onRequestData$ = createEffect(() => this.actions$.pipe(
        ofType(requestData),
        withLatestFrom(this.store.select(getFilters)),
        switchMap(([action, filters]) => {
            return this.requestsService.getAllRequestsList(action.page)
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

    onFiltersApplied$ = createEffect(() => this.actions$.pipe(
        ofType(addRequestFilters),
        map((action) => {
            return requestData({ page: 1 })
        })
    ));

    onFiltersResetd$ = createEffect(() => this.actions$.pipe(
        ofType(resetRequestFilters),
        map((action) => {
            return requestData({ page: 1 })
        })
    ));

    openViewDetailsModal$ = createEffect(() => this.actions$.pipe(
        ofType(openViewDetailsModal),
        tap((action) => {
            let details = null;
            this.store.select(getRequestById, action.requestId).pipe(take(1)).subscribe(value => { details = value });
            this.modalService.show(ViewDetailsModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    title: 'View details for request #',
                    details: details
                }
            });
        })
    ), { dispatch: false });

    openChangeStatusModal$ = createEffect(() => this.actions$.pipe(
        ofType(openChangeStatusModal),
        tap((action) => {
            this.modalService.show(ChangeStatusModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered modal-lg',
                initialState: {
                    requestId: action.requestId,
                    status: action.status
                }
            });
        })
    ), { dispatch: false });

    onChangeRequestStatus$ = createEffect(() => this.actions$.pipe(
        ofType(changeRequestStatus),
        withLatestFrom(this.store.select(getCurrentPage)),
        switchMap(([action, page]) => {
            return this.requestsService.changeRequestStatus({
                requestId: action.requestId,
                requestStatus: action.status,
                note: action.notes
            })
                .pipe(
                    mergeMap(res => [
                        changeRequestSuccess(),
                        requestData({ page })
                    ]),
                    catchError((error: HttpErrorResponse) =>
                        of(changeRequestFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));

    closeModal$ = createEffect(() => this.actions$.pipe(
        ofType(
            changeRequestSuccess,
            changeRequestFailure),
        tap(() => {
            this.modalService.hide();
        })
    ), { dispatch: false });

}