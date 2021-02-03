import { createAction, props } from "@ngrx/store";
import { AddRequest, RequestDetails, UpdateRequest } from "../types/request-types";

export const featureKey = 'requests-management';

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

export const openDeleteRequestModal = createAction(`[${featureKey}] openDeleteRequestModal`, props<{requestId: number}>());