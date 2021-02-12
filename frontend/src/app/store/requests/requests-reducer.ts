import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { RequestDetails, RequestFilters } from "../../types/request-types";
import {
    addRequestFilters,
    pageChanged,
    requestData,
    resetMessage,
    resetRequestFilters,
    setData,
    setDataFailure
} from "./requests-actions";

export const featureKey = 'requester';

export interface State {
    requests: Array<RequestDetails>;
    filters: RequestFilters;
    totalNumber: number;
    loading: boolean;
    currentPage: number;
    errorMessage: string;
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
    errorMessage: null
}

const requesterReducer = createReducer(
    initialState,
    on(requestData, (state, { query }) => ({ ...state, loadingRequests: true, currentPage: query ? query.page : 0 })),
    on(setData, (state, { requests, totalNumber }) => ({ ...state, requests, totalNumber, loading: false })),
    on(setDataFailure, (state, { errorMessage }) => ({ ...state, errorMessage, loading: false })),
    on(pageChanged, (state, { page }) => ({ ...state, currentPage: page })),
    on(resetMessage, (state) => ({ ...state, errorMessage: null })),
    on(addRequestFilters, (state, { requestFilters }) => ({ ...state, filters: requestFilters })),
    on(resetRequestFilters, (state) => ({ ...state, filters: initialState.filters }))
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
