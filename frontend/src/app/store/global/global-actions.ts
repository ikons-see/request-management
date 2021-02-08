import { createAction, props } from "@ngrx/store";
import { JWTToken } from "../../types/data-types";

export const featureKey = 'global';

export const resetMessage = createAction(`[${featureKey}] resetMessage`);

export const rehydrateSuccess = createAction(`[${featureKey}] rehydrateSuccess`);
export const loginRequest = createAction(`[${featureKey}] loginRequest`, props<{
    username: string,
    password: string,
    rememberMe: boolean
}>());
export const loginSuccess = createAction(`[${featureKey}] loginSuccess`, props<{ token?: JWTToken }>());
export const loginFailure = createAction(`[${featureKey}] loginFailure`, props<{ errorMessage: string }>());
export const logoutRequest = createAction(`[${featureKey}] logoutRequest`);