import { RequestStatus } from "./data-types";

export interface Pageable {
    page: number;
    itemsPerPage?: number;
}

export interface Resource {
    resourceId?: number;
    total: number;
    seniority: string;
    skills: Array<string>;
    note?: string;
}

export interface RequestDetails {
    requestId: number;
    areaOfInterest: string;
    displayName?: string;
    lastModifiedBy?: string;
    status: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
    statusNotes?: string;
    projectDescription: string;
    resources: Array<Resource>;
}

export interface RequestsListRequest extends Pageable {
}

export interface AddRequest {
    areaOfInterest: string;
    startDate: Date;
    endDate: Date;
    projectDescription: string;
    note: string;
    resources: Array<Resource>;
}

export interface UpdateRequest extends RequestDetails {
    newResources: Array<Resource>;
    deletedResourceIds: Array<number>;
}

export interface RequestFilters {
    statuses: Array<string>;
    areaOfInterest: string;
    startDate: Date;
    endDate: Date;
    total: number;
    seniority: string;
    skills: Array<string>;
}

export interface ChangeStatusRequest {
    requestId: number;
    requestStatus: RequestStatus;
    note: string;
}

export interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
}
