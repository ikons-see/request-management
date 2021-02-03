import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { RequestDetails } from "../types/request-types";
import { deleteRequest, deleteRequestFailure, deleteRequestSuccess, pageChanged, requestData, setData, setDataFailure } from "./requests-actions";

export const featureKey = 'requests-management';

export interface State {
    requests: Array<RequestDetails>;
    totalNumber: number;
    loading: boolean;
    currentPage: number;
    errorMessage: string;
}

export const initialState: State = {
    requests: [],
    totalNumber: 0,
    loading: false,
    currentPage: 0,
    errorMessage: null
}

const requesterReducer = createReducer(
    initialState,
    on (requestData, (state, {page}) => ({...state, loadingRequests: true, currentPage: page})),
    on (setData, (state, {requests, totalNumber}) => ({...state, requests, totalNumber, loading: false})),
    on (setDataFailure, (state, {errorMessage}) => ({...state, errorMessage, loading: false})),
    on (pageChanged, (state, {page}) => ({...state, currentPage: page}))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const getRequestsList = createSelector(featureState, state => state.requests);
export const getCurrentPage = createSelector(featureState, state => state.currentPage);
export const getTotalNumber = createSelector(featureState, state => state.totalNumber);
export const getLoadingRequests = createSelector(featureState, state => state.loading);
export const getRequestsError = createSelector(featureState, state => state.errorMessage);
export const getRequestById = createSelector(featureState, 
    (state: State, requestId: number) => state.requests.find(el => el.requestId == requestId));