import { createAction, props } from "@ngrx/store";
import { RequestStatus } from "../../types/data-types";
import { RequestDetails, RequestFilters } from "../../types/request-types";

export const featureKey = 'administrator';

export const requestData = createAction(`[${featureKey}] requestData`, props<{ page: number }>());
export const setData = createAction(`[${featureKey}] setData`, props<{ requests: Array<RequestDetails>, totalNumber: number }>());
export const setDataFailure = createAction(`[${featureKey}] setDataFailure`, props<{ errorMessage: string }>());

export const addRequestFilters = createAction(`[${featureKey}] addRequestFilters`, props<{ requestFilters: RequestFilters }>());
export const resetRequestFilters = createAction(`[${featureKey}] resetRequestFilters`);

export const pageChanged = createAction(`[${featureKey}] pageChanged`, props<{ page: number }>());

export const openViewDetailsModal = createAction(`[${featureKey}] openViewDetailsModal`, props<{ requestId: number }>());
export const openChangeStatusModal = createAction(`[${featureKey}] openChangeStatusModal`, props<{ requestId: number, status: RequestStatus }>());
export const changeRequestStatus = createAction(`[${featureKey}] changeRequestStatus`, props<{ requestId: number, status: RequestStatus, notes: string}>());
export const changeRequestSuccess = createAction(`[${featureKey}] changeRequestSuccesss`);
export const changeRequestFailure = createAction(`[${featureKey}] changeRequestFailure`, props<{ errorMessage: string }>());