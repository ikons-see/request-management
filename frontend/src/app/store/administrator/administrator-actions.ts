import { createAction, props } from "@ngrx/store";
import { AuditEvent, MonthlyChartData, TotalChartData } from "src/app/types/response-types";

export const featureKey = 'administrator';

export const getTotalChartsData = createAction(`[${featureKey}] getTotalChartsData`);
export const setTotalChartsData = createAction(`[${featureKey}] setTotalChartsData`, props<{ data: TotalChartData }>());
export const getRequestsMonthlyData = createAction(`[${featureKey}] getRequestsMonthlyChartData`);
export const setRequestsMonthlyData = createAction(`[${featureKey}] setRequestsMonthlyData`, props<{ data: Array<MonthlyChartData> }>());
export const getResourcesMonthlyData = createAction(`[${featureKey}] getResourcesMonthlyChartData`);
export const setResourcesMonthlyData = createAction(`[${featureKey}] setResourcesMonthlyData`, props<{ data: Array<MonthlyChartData> }>());
export const openViewHistoryModal = createAction(`[${featureKey}] openViewHistoryModal`, props<{ requestId: number }>());
export const requestStatusLogSuccess = createAction(`[${featureKey}] requestStatusLogSuccess`, props<{ events: Array<AuditEvent> }>());
export const requestStatusLogFailure = createAction(`[${featureKey}] requestStatusLogFailure`, props<{ errorMessage: string }>());