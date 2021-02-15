import { createAction, props } from "@ngrx/store";
import { RegisterUserRequest } from "../../types/request-types";
import { JWTToken } from "../../types/data-types";
import { AccountData } from "src/app/types/response-types";

export const featureKey = 'common';

export const resetMessage = createAction(`[${featureKey}] resetMessage`);
export const changeLanguage = createAction(`[${featureKey}] changeLanguage`, props<{ language: string }>());
export const rehydrateSuccess = createAction(`[${featureKey}] rehydrateSuccess`);
export const loginRequest = createAction(`[${featureKey}] loginRequest`, props<{
    username: string,
    password: string,
    rememberMe: boolean
}>());
export const loginSuccess = createAction(`[${featureKey}] loginSuccess`, props<{ token?: JWTToken }>());
export const loginFailure = createAction(`[${featureKey}] loginFailure`, props<{ errorMessage: string }>());
export const logoutRequest = createAction(`[${featureKey}] logoutRequest`);

export const registerUser = createAction(`[${featureKey}] registerUser`, props<{ userData: RegisterUserRequest }>());
export const registerUserSuccess = createAction(`[${featureKey}] registerUserSuccess`);
export const registerUserFailure = createAction(`[${featureKey}] registerUserFailure`, props<{ errorMessage: string }>());
export const loadProfile = createAction(`[${featureKey}] loadProfile`);
export const loadProfileSuccessful = createAction(`[${featureKey}] loadProfileSuccessful`, props<{ userData: AccountData }>());
export const loadProfileFailure = createAction(`[${featureKey}] loadProfileFailure`, props<{ errorMessage: string }>());

export const globalSuccess = createAction(`[${featureKey}] globalSuccess`, props<{ message: string }>());
export const globalError = createAction(`[${featureKey}] globalError`, props<{ error: string }>());

export const activateAccount = createAction(`[${featureKey}] activateAccount`, props<{ activationKey: string }>());
export const activateAccountSuccess = createAction(`[${featureKey}] activateAccountSuccess`);
export const activateAccountFailure = createAction(`[${featureKey}] activateAccountFailure`, props<{ errorMessage: string }>());