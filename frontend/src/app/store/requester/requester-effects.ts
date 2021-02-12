import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {BsModalService} from "ngx-bootstrap/modal";
import {catchError, map, mergeMap, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {of} from "rxjs";
import {ApplicationState} from "../../app.module";
import {RequestsManagementService} from "../../endpoint/requests-management.service";
import {globalModalConfig} from "../../types/data-types";
import {AddRequestModalComponent} from "../../pages/requester/add-request-modal/add-request-modal.component";
import {EditDetailsModalComponent} from "../../pages/requester/edit-details-modal/edit-details-modal.component";
import {DeleteRequestModalComponent} from "../../pages/requester/delete-request-modal/delete-request-modal.component";
import {getCurrentPage, getFilters, getRequestById} from "./requester-reducer";
import {CloseRequestModalComponent} from "../../pages/requester/close-request-modal/close-request-modal.component";
import {
  addNewRequest,
  addRequestFailure,
  addRequestFilters,
  addRequestSuccess,
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
  requestData,
  resetRequestFilters,
  setData,
  setDataFailure,
  updateRequest,
  updateRequestFailure,
  updateRequestSuccess
} from "./requester-actions";
import {ViewDetailsModalComponent} from "src/app/pages/requester/view-details-modal/view-details-modal.component";
import {TranslateService} from "@ngx-translate/core";
import {RequestDetails} from "../../types/request-types";
import {filterTransform, parsePaginationResponseHeader} from "../../endpoint/http-rest-utils";
import { globalError, globalSuccess } from "../global/global-actions";

@Injectable()
export class RequesterEffects {

  constructor(private actions$: Actions,
              private store: Store<ApplicationState>,
              private modalService: BsModalService,
              private router: Router,
              private translate: TranslateService,
              private requestsService: RequestsManagementService) {
  }

  onRequestData$ = createEffect(() => this.actions$.pipe(
    ofType(requestData),
    withLatestFrom(this.store.select(getFilters)),
    switchMap(([action, filters]) => {
      // const filter = composeFilter();
      const transFilters = filterTransform(filters);
      return this.requestsService.getRequests({...action.query, ...transFilters })
        .pipe(
          map((res: HttpResponse<RequestDetails[]>) => {
            const dataFromHeader = parsePaginationResponseHeader(res.headers);
            return setData({
              links: dataFromHeader.links,
              totalNumber: dataFromHeader.total,
              requests: res.body
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(setDataFailure({errorMessage: error.message}),
            globalError({error: 'global-errors.request-data-failure'})
            ))
        )
    })
  ));

  openAddRequestModal$ = createEffect(() => this.actions$.pipe(
    ofType(openAddRequestModal),
    tap((action) => {
      this.modalService.show(AddRequestModalComponent, {
        ...globalModalConfig,
        class: 'modal-dialog modal-dialog-centered modal-lg',
        initialState: {
          title: this.translate.instant('add-request.title')
        }
      });
    })
  ), {dispatch: false});

  onAddNewRequest$ = createEffect(() => this.actions$.pipe(
    ofType(addNewRequest),
    switchMap((action) => {
      return this.requestsService.addNewRequest(action.requestData)
        .pipe(
          mergeMap(res => [
            addRequestSuccess(),
            requestData({query: {page: 0}}),
            globalSuccess({message: 'global-success.add-request-success'})
          ]),
          catchError((error: HttpErrorResponse) =>
            of(addRequestFailure({errorMessage: error.message}),
            globalError({error: 'global-errors.add-request-failure'})
            ))
        );
    })
  ));

  closeModal$ = createEffect(() => this.actions$.pipe(
    ofType(
      addRequestSuccess,
      addRequestFailure,
      updateRequestSuccess,
      deleteRequestSuccess,
      deleteRequestFailure,
      closeRequestSuccess,
      closeRequestFailure),
    tap(() => {
      this.modalService.hide();
    })
  ), {dispatch: false});


  openEditRequestModal$ = createEffect(() => this.actions$.pipe(
    ofType(openEditRequestModal),
    tap((action) => {
      this.modalService.show(EditDetailsModalComponent, {
        ...globalModalConfig,
        class: 'modal-dialog modal-dialog-centered modal-lg',
        initialState: {
          requestId: action.requestId,
          title: this.translate.instant('edit-request.title')
        }
      });
    })
  ), {dispatch: false});

  onRequestUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateRequest),
    withLatestFrom(this.store.select(getCurrentPage)),
    switchMap(([action, page]) => {
      return this.requestsService.updateRequest(action.request)
        .pipe(
          mergeMap(res => [
            updateRequestSuccess(),
            requestData({query: {page: 0}}),
            globalSuccess({message: 'global-success.update-request-success'})]),
          catchError((error: HttpErrorResponse) =>
            of(updateRequestFailure({errorMessage: error.message}),
            globalError({error: 'global-errors.update-request-failure'})
            ))
        );
    })
  ));

  onFiltersApplied$ = createEffect(() => this.actions$.pipe(
    ofType(addRequestFilters),
    map((action) => {
      return requestData({query: {page: 0}})
    })
  ));

  onFiltersResetd$ = createEffect(() => this.actions$.pipe(
    ofType(resetRequestFilters),
    map((action) => {
      return requestData({query: {page: 0}})
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
          title: this.translate.instant('delete-request.title')
        }
      });
    })
  ), {dispatch: false});

  onDeleteRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteRequest),
    withLatestFrom(this.store.select(getCurrentPage)),
    switchMap(([action, page]) => {
      return this.requestsService.deleteRequest(action.requestId)
        .pipe(
          mergeMap(res => [
            deleteRequestSuccess(),
            requestData({query: {page: 0}}),
            globalSuccess({message: 'global-success.delete-request-success'})
          ]),
          catchError((error: HttpErrorResponse) =>
            of(deleteRequestFailure({errorMessage: error.message}),
            globalError({error: 'global-errors.delete-request-failure'})
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
          title: this.translate.instant('close-request.title')
        }
      });
    })
  ), {dispatch: false});

  onCloseRequest$ = createEffect(() => this.actions$.pipe(
    ofType(closeRequest),
    withLatestFrom(this.store.select(getCurrentPage)),
    switchMap(([action, page]) => {
      return this.requestsService.closeRequest(action.requestId, action.notes)
        .pipe(
          mergeMap(res => [
            closeRequestSuccess(),
            requestData({query: {page}}),
            globalSuccess({message: 'global-success.close-request-success'})
          ]),
          catchError((error: HttpErrorResponse) =>
            of(closeRequestFailure({errorMessage: error.message}),
            globalError({error: 'global-errors.close-request-failure'})
            ))
        );
    })
  ));

  openViewDetailsModal$ = createEffect(() => this.actions$.pipe(
    ofType(openViewDetailsModal),
    tap((action) => {
      let details = null;
      this.store.select(getRequestById, action.requestId).pipe(take(1)).subscribe(value => {
        details = value
      });
      this.modalService.show(ViewDetailsModalComponent, {
        ...globalModalConfig,
        class: 'modal-dialog modal-dialog-centered modal-lg',
        initialState: {
          requestId: action.requestId,
          title: this.translate.instant('view-details.title'),
          details: details
        }
      });
    })
  ), {dispatch: false});
}
