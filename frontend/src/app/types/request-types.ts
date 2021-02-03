export interface Pageable {
    page: number;
    itemsPerPage?: number;
}

export interface Resource {
    id?: number;
    total: number;
    seniority: string;
    skills: Array<string>;
    note?: string;
}

export interface RequestDetails {
    requestId: number;
    areaOfInterest: string;
    status: string;
    startDate: Date;
    endDate: Date;
    projectDescription: string;
    resources: Array<Resource>;
    note?: string;
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