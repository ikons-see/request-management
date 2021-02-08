import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loginFailure, loginSuccess, logoutRequest, rehydrateSuccess, resetMessage } from "./global-actions";


export const featureKey = 'global';

export interface State {
    authenticated: boolean;
    errorMessage: string;
}

export const initialState: State = {
    authenticated: false,
    errorMessage: null
}

const requesterReducer = createReducer(
    initialState,
    on(loginSuccess, (state) => ({ ...state, authenticated: true })),
    on(loginFailure, (state, { errorMessage }) => ({ ...state, authenticated: false, errorMessage })),
    on(logoutRequest, (state) => ({ ...state, authenticated: false })),
    on(rehydrateSuccess, (state) => ({ ...state, authenticated: true })),
    on(resetMessage, (state) => ({ ...state, errorMessage: null }))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const isAuthenticated = createSelector(featureState, state => state.authenticated);
export const getErrorMessage = createSelector(featureState, state => state.errorMessage);