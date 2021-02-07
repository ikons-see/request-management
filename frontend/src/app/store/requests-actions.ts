import { createAction, props } from "@ngrx/store";
import { JWTToken } from "../types/data-types";
import { AddRequest, RequestDetails, RequestFilters, UpdateRequest } from "../types/request-types";

export const featureKey = 'requests-management';

export const resetMessage = createAction(`[${featureKey}] resetMessage`);

export const requestData = createAction(`[${featureKey}] requestData`, props<{ page: number }>());
export const setData = createAction(`[${featureKey}] setData`, props<{ requests: Array<RequestDetails>, totalNumber: number }>());
export const setDataFailure = createAction(`[${featureKey}] setDataFailure`, props<{ errorMessage: string }>());

export const openViewDetailsModal = createAction(`[${featureKey}] openViewDetailsModal`, props<{ requestId: number }>());

export const openAddRequestModal = createAction(`[${featureKey}] openAddRequestModal`);
export const addNewRequest = createAction(`[${featureKey}] addNewRequest`, props<{ requestData: AddRequest }>());
export const addRequestSuccess = createAction(`[${featureKey}] requestData`);
export const addRequestFailure = createAction(`[${featureKey}] addRequestFailure`, props<{ errorMessage: string }>());

export const openEditRequestModal = createAction(`[${featureKey}] openEditRequestModal`, props<{ requestId: number }>());
export const updateRequest = createAction(`[${featureKey}] updateRequest`, props<{ request: UpdateRequest }>());
export const updateRequestSuccess = createAction(`[${featureKey}] updateRequestSuccess`);
export const updateRequestFailure = createAction(`[${featureKey}] updateRequestFailure`, props<{ errorMessage: string }>());

export const pageChanged = createAction(`[${featureKey}] pageChanged`, props<{ page: number }>());

export const openDeleteRequestModal = createAction(`[${featureKey}] openDeleteRequestModal`, props<{ requestId: number }>());
export const deleteRequest = createAction(`[${featureKey}] deleteRequest`, props<{ requestId: number }>());
export const deleteRequestSuccess = createAction(`[${featureKey}] deleteRequestSuccess`);
export const deleteRequestFailure = createAction(`[${featureKey}] deleteRequestFailure`, props<{ errorMessage: string }>());

export const openCloseRequestModal = createAction(`[${featureKey}] OpenCloseRequestModal`, props<{ requestId: number }>());
export const closeRequest = createAction(`[${featureKey}] closeRequest`, props<{ requestId: number }>());
export const closeRequestSuccess = createAction(`[${featureKey}] closeRequestSuccess`);
export const closeRequestFailure = createAction(`[${featureKey}] closeRequestFailure`, props<{ errorMessage: string }>());

export const loginRequest = createAction(`[${featureKey}] loginRequest`, props<{
    username: string,
    password: string,
    rememberMe: boolean
}>());
export const loginSuccess = createAction(`[${featureKey}] loginSuccess`, props<{ token?: JWTToken }>());
export const loginFailure = createAction(`[${featureKey}] loginFailure`, props<{ errorMessage: string }>());
export const logoutRequest = createAction(`[${featureKey}] logoutRequest`);

export const addRequestFilters = createAction(`[${featureKey}] addRequestFilters`, props<{ requestFilters: RequestFilters }>());
export const resetRequestFilters = createAction(`[${featureKey}] resetRequestFilters`);

export const rehydrateSuccess = createAction(`[${featureKey}] rehydrateSuccess`);
