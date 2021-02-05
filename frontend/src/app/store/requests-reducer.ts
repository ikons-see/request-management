import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { RequestDetails } from "../types/request-types";
import { loginFailure, loginSuccess, logoutRequest, pageChanged, rehydrateSuccess, requestData, resetMessage, setData, setDataFailure } from "./requests-actions";

export const featureKey = 'requests-management';

export interface State {
    requests: Array<RequestDetails>;
    totalNumber: number;
    loadingRequests: boolean;
    currentPage: number;
    errorMessage: string;
    authenticated: boolean;
}

export const initialState: State = {
    requests: [],
    totalNumber: 0,
    loadingRequests: false,
    currentPage: 0,
    errorMessage: null,
    authenticated: false
}

const requesterReducer = createReducer(
    initialState,
    on (requestData, (state, {page}) => ({...state, loadingRequests: true, currentPage: page})),
    on (setData, (state, {requests, totalNumber}) => ({...state, requests, totalNumber, loadingRequests: false})),
    on (setDataFailure, (state, {errorMessage}) => ({...state, errorMessage, loadingRequests: false})),
    on (pageChanged, (state, {page}) => ({...state, currentPage: page})),
    on (loginSuccess, (state) => ({...state, authenticated: true})),
    on (loginFailure, (state, {errorMessage}) => ({...state, authenticated: false, errorMessage})),
    on (logoutRequest, (state) => ({...state, authenticated: false})),
    on (resetMessage, (state) => ({...state, errorMessage: null})),
    on (rehydrateSuccess, (state) => ({...state, authenticated: true}))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const isAuthenticated = createSelector(featureState, state => state.authenticated);
export const getRequestsList = createSelector(featureState, state => state.requests);
export const getCurrentPage = createSelector(featureState, state => state.currentPage);
export const getTotalNumber = createSelector(featureState, state => state.totalNumber);
export const getLoadingRequests = createSelector(featureState, state => state.loadingRequests);
export const getErrorMessage = createSelector(featureState, state => state.errorMessage);
export const getRequestById = createSelector(featureState, 
    (state: State, requestId: number) => state.requests.find(el => el.requestId == requestId));