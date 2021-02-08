import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { RequestDetails, RequestFilters } from "../../types/request-types";
import { pageChanged, requestData, setData, setDataFailure } from "./administrator-actions";

export const featureKey = 'administrator';

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
        projectDescription: '',
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
    on(requestData, (state, { page }) => ({ ...state, loadingRequests: true, currentPage: page })),
    on(setData, (state, { requests, totalNumber }) => ({ ...state, requests, totalNumber, loading: false })),
    on(setDataFailure, (state, { errorMessage }) => ({ ...state, errorMessage, loading: false })),
    on(pageChanged, (state, { page }) => ({ ...state, currentPage: page })),
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