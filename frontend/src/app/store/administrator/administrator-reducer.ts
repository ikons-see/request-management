import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AuditEvent, MonthlyChartData, ProvidedResourcesData, TotalChartData } from "../../types/response-types";
import {
  getTotalChartsData,
  requestStatusLogSuccess, setProvidedResources,
  setRequestsMonthlyData,
  setResourcesMonthlyData,
  setTotalChartsData
} from "./administrator-actions";

export const featureKey = 'administrator';

export interface State {
    loading: boolean;
    errorMessage: string;
    auditErrorMessage: string;
    statusLog?: Array<AuditEvent>;
    totalChartsData?: TotalChartData;
    providedResourcesChartData?: ProvidedResourcesData;
    requestsMonthlyChartData?: Array<MonthlyChartData>;
    resourcesMonthlyChartData?: Array<MonthlyChartData>;
}

export const initialState: State = {
    loading: false,
    errorMessage: null,
    auditErrorMessage: null
}

const requesterReducer = createReducer(
    initialState,
    on(getTotalChartsData, (state) => ({ ...state, loading: true })),
    on(setTotalChartsData, (state, { data }) => ({ ...state, totalChartsData: data, loading: false })),
    on(setRequestsMonthlyData, (state, { data }) => ({ ...state, requestsMonthlyChartData: data })),
    on(setResourcesMonthlyData, (state, { data }) => ({ ...state, resourcesMonthlyChartData: data })),
    on(requestStatusLogSuccess, (state, { events }) => ({ ...state, statusLog: events })),
    on(setProvidedResources, (state, { data }) => ({ ...state, providedResourcesChartData: data, loading: false  }))
);

export function reducer(state: State | undefined, action: Action) {
    return requesterReducer(state, action);
}

const featureState = createFeatureSelector<State>(featureKey);

export const getLoadingRequests = createSelector(featureState, state => state.loading);
export const getErrorMessage = createSelector(featureState, state => state.errorMessage);
export const getStatusLog = createSelector(featureState, state => state.statusLog ? state.statusLog : null);
export const getAuditError = createSelector(featureState, state => state.auditErrorMessage);
export const getTotalChartData = createSelector(featureState, state => state.totalChartsData);
export const getRequestsChartData = createSelector(featureState, state => state.requestsMonthlyChartData);
export const getResourcesChartData = createSelector(featureState, state => state.resourcesMonthlyChartData);
export const getProvidedResourcesChartData = createSelector(featureState, state => state.providedResourcesChartData);
