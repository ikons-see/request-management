import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AuditEvent } from "src/app/types/response-types";
import { RequestDetails, RequestFilters } from "../../types/request-types";
import { openViewHistoryModal, pageChanged, requestData, requestStatusLogFailure, requestStatusLogSuccess, setData, setDataFailure } from "./administrator-actions";

export const featureKey = 'administrator';

export interface State {
    requests: Array<RequestDetails>;
    filters: RequestFilters;
    totalNumber: number;
    loading: boolean;
    currentPage: number;
    errorMessage: string;
    auditErrorMessage: string;
    statusLog?: Array<AuditEvent>;
}

export const initialState: State = {
    requests: [],
    filters: {
        statuses: [],
        areaOfInterest: '',
        startDate: null,
        endDate: null,
        total: null,
        seniority: '',
        skills: []
    },
    totalNumber: 0,
    loading: false,
    currentPage: 0,
    errorMessage: null,
    auditErrorMessage: null
}

const requesterReducer = createReducer(
    initialState,
    on(requestData, (state, { page }) => ({ ...state, loadingRequests: true, currentPage: page })),
    on(setData, (state, { requests, totalNumber }) => ({ ...state, requests, totalNumber, loading: false })),
    on(setDataFailure, (state, { errorMessage }) => ({ ...state, errorMessage, loading: false })),
    on(pageChanged, (state, { page }) => ({ ...state, currentPage: page })),
    on(openViewHistoryModal, (state) => ({...state, auditErrorMessage: null})),
    on(requestStatusLogSuccess, (state, {events}) => ({...state, statusLog: events})),
    on(requestStatusLogFailure, (state, {errorMessage}) => ({...state, auditErrorMessage: errorMessage}))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const getRequestsList = createSelector(featureState, state => state.requests);
export const getFilters = createSelector(featureState, state => state.filters);
export const getCurrentPage = createSelector(featureState, state => state.currentPage);
export const getTotalNumber = createSelector(featureState, state => state.totalNumber);
export const getLoadingRequests = createSelector(featureState, state => state.loading);
export const getErrorMessage = createSelector(featureState, state => state.errorMessage);
export const getRequestById = createSelector(featureState,
    (state: State, requestId: number) => state.requests.find(el => el.requestId == requestId));
export const getStatusLog = createSelector(featureState, state => state.statusLog ? state.statusLog : null);
export const getAuditError = createSelector(featureState, state => state.auditErrorMessage);