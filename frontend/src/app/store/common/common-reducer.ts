import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AccountData } from "src/app/types/response-types";
import { 
    changeLanguage, 
    loadProfileSuccessful, 
    loginFailure, 
    loginSuccess, 
    logoutRequest, 
    rehydrateSuccess, 
    resetMessage 
} from "./common-actions";


export const featureKey = 'global';

export interface State {
    authenticated: boolean;
    errorMessage: string;
    currentLanguage: string;
    availableLanguages: Array<string>;
    userData: AccountData;
}

export const initialState: State = {
    authenticated: false,
    errorMessage: null,
    currentLanguage: 'en',
    availableLanguages: [
        'en',
        'it'
      ],
    userData: null
}

const requesterReducer = createReducer(
    initialState,
    on(loginSuccess, (state) => ({ ...state, authenticated: true })),
    on(loginFailure, (state, { errorMessage }) => ({ ...state, authenticated: false, errorMessage })),
    on(logoutRequest, (state) => ({ ...state, authenticated: false })),
    on(rehydrateSuccess, (state) => ({ ...state, authenticated: true })),
    on(resetMessage, (state) => ({ ...state, errorMessage: null })),
    on(changeLanguage, (state, {language}) => ({...state, currentLanguage: language})),
    on(loadProfileSuccessful, (state, {userData}) => ({...state, userData}))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const isAuthenticated = createSelector(featureState, state => state.authenticated);
export const getErrorMessage = createSelector(featureState, state => state.errorMessage);
export const getAvailableLanguages = createSelector(featureState, state => state.availableLanguages);
export const getCurrentLanguage = createSelector(featureState, state => state.currentLanguage);
export const getUserRole = createSelector(featureState, state => state.userData ? state.userData.authorities[0] : null);