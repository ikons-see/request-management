import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { RequestHistoryModalComponent } from "src/app/pages/administrator/admin-requests/request-history-modal/request-history-modal.component";
import { globalModalConfig } from "src/app/types/data-types";
import { ApplicationState } from "../../app.module";
import { RequestsManagementService } from "../../endpoint/requests-management.service";
import { globalError } from "../common/common-actions";
import { saveAs } from 'file-saver-es';
import {
    downloadReportFailure,
    downloadReportRequest,
    downloadReportSuccess,
    downloadResourcesReport,
    downloadResourcesReportFailure,
    downloadResourcesReportSuccess,
    getProvidedResources,
    getRequestsMonthlyData,
    getResourcesMonthlyData,
    getTotalChartsData,
    openViewHistoryModal,
    requestStatusLogFailure,
    requestStatusLogSuccess,
    setProvidedResources,
    setRequestsMonthlyData,
    setResourcesMonthlyData,
    setTotalChartsData
} from "./administrator-actions";

@Injectable()
export class AdministratorEffects {

    constructor(private actions$: Actions,
        private store: Store<ApplicationState>,
        private modalService: BsModalService,
        private router: Router,
        private requestsService: RequestsManagementService) {
    }

    getTotalChartData$ = createEffect(() => this.actions$.pipe(
        ofType(getTotalChartsData),
        switchMap((action) => {
            return this.requestsService.getTotalChartData()
                .pipe(
                    map(res => setTotalChartsData({
                        data: res
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(globalError({ error: 'global-errors.chart-data-error' }),
                        ))
                );
        })
    ));

    getRequestsMonthlyChartData$ = createEffect(() => this.actions$.pipe(
        ofType(getRequestsMonthlyData),
        switchMap((action) => {
            return this.requestsService.getRequestsMonthlyChartData()
                .pipe(
                    map(res => setRequestsMonthlyData({
                        data: res
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(globalError({ error: 'global-errors.chart-data-error' }),
                        ))
                );
        })
    ));

    getProvidedResourcesChartData$ = createEffect(() => this.actions$.pipe(
        ofType(getProvidedResources),
        switchMap((action) => {
            return this.requestsService.getProvidedResourcesChartData()
                .pipe(
                    map(res => setProvidedResources({
                        data: res
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(globalError({ error: 'global-errors.chart-data-error' }),
                        ))
                );
        })
    ));

    getResourcesMonthlyChartData$ = createEffect(() => this.actions$.pipe(
        ofType(getResourcesMonthlyData),
        switchMap((action) => {
            return this.requestsService.getResourcesMonthlyChartData()
                .pipe(
                    map(res => setResourcesMonthlyData({
                        data: res
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(globalError({ error: 'global-errors.chart-data-error' }),
                        ))
                );
        })
    ));

    onRequestAuditHistory$ = createEffect(() => this.actions$.pipe(
        ofType(openViewHistoryModal),
        switchMap((action) => {
            return this.requestsService.getStatusLog(action.requestId)
                .pipe(
                    map(res => requestStatusLogSuccess({
                        events: res
                    })),
                    catchError((error: HttpErrorResponse) =>
                        of(requestStatusLogFailure({ errorMessage: error.message }),
                        ))
                );
        })
    ));

    openViewHistoryModal$ = createEffect(() => this.actions$.pipe(
        ofType(openViewHistoryModal),
        tap((action) => {
            this.modalService.show(RequestHistoryModalComponent, {
                ...globalModalConfig,
                class: 'modal-dialog modal-dialog-centered',
                initialState: {
                    requestId: action.requestId
                }
            });
        })
    ), { dispatch: false });

    downloadReportRequest$ = createEffect(() => this.actions$.pipe(
        ofType(downloadReportRequest),
        switchMap((action) => {
            return this.requestsService.downloadReport()
                .pipe(
                    map(res => downloadReportSuccess({
                        file: res
                    })),
                    catchError((error: HttpErrorResponse) => 
                        of(downloadReportFailure({ errorMessage: error.message }),
                        globalError({error: 'global-errors.download-report-error'})
                        ))
                );
        })
    ));

    downloadFileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(downloadReportSuccess),
        tap((action) => {
             saveAs(action.file, 'request-management.csv')
        })
    ), { dispatch: false });

    downloadResourcesReport$ = createEffect(() => this.actions$.pipe(
        ofType(downloadResourcesReport),
        switchMap((action) => {
            return this.requestsService.downloadResourcesReport()
                .pipe(
                    map(res => downloadResourcesReportSuccess({
                        file: res
                    })),
                    catchError((error: HttpErrorResponse) => 
                        of(downloadResourcesReportFailure({ errorMessage: error.message }),
                        globalError({error: 'global-errors.download-report-error'})
                        ))
                );
        })
    ));

    downloadResourcesReportSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(downloadResourcesReportSuccess),
        tap((action) => {
             saveAs(action.file, 'request-management-resources.csv')
        })
    ), { dispatch: false })
}