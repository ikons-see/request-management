import { createAction, props } from "@ngrx/store";
import { AuditEvent, MonthlyChartData, ProvidedResourcesData, TotalChartData } from "src/app/types/response-types";

export const featureKey = 'administrator';

export const getTotalChartsData = createAction(`[${featureKey}] getTotalChartsData`);
export const setTotalChartsData = createAction(`[${featureKey}] setTotalChartsData`, props<{ data: TotalChartData }>());
export const getRequestsMonthlyData = createAction(`[${featureKey}] getRequestsMonthlyChartData`);
export const setRequestsMonthlyData = createAction(`[${featureKey}] setRequestsMonthlyData`, props<{ data: Array<MonthlyChartData> }>());
export const getResourcesMonthlyData = createAction(`[${featureKey}] getResourcesMonthlyChartData`);
export const setResourcesMonthlyData = createAction(`[${featureKey}] setResourcesMonthlyData`, props<{ data: Array<MonthlyChartData> }>());
export const getProvidedResources = createAction(`[${featureKey}] getProvidedResources`);
export const setProvidedResources = createAction(`[${featureKey}] setProvidedResources`, props<{ data: ProvidedResourcesData }>());
export const openViewHistoryModal = createAction(`[${featureKey}] openViewHistoryModal`, props<{ requestId: number }>());
export const requestStatusLogSuccess = createAction(`[${featureKey}] requestStatusLogSuccess`, props<{ events: Array<AuditEvent> }>());
export const requestStatusLogFailure = createAction(`[${featureKey}] requestStatusLogFailure`, props<{ errorMessage: string }>());
export const downloadReportRequest = createAction(`[${featureKey}] downloadReportRequest`);
export const downloadReportSuccess = createAction(`[${featureKey}] downloadReportSuccess`, props<{ file: Blob }>());
export const downloadReportFailure = createAction(`[${featureKey}] downloadReportFailure`, props<{ errorMessage: string }>());
export const downloadResourcesReport = createAction(`[${featureKey}] downloadResourcesReport`);
export const downloadResourcesReportSuccess = createAction(`[${featureKey}] downloadResourcesReportSuccess`, props<{ file: Blob }>());
export const downloadResourcesReportFailure = createAction(`[${featureKey}] downloadResourcesReportFailure`, props<{ errorMessage: string }>());