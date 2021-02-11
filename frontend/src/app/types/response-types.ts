import { Role } from "./data-types";
import { RequestDetails } from "./request-types";

export interface RequestsListResponse {
    requestResponses: Array<RequestDetails>;
    total: number;
}

export interface AccountData {
        id: number,
        login: string,
        firstName: string,
        lastName: string,
        email: string,
        imageUrl: string,
        activated: boolean,
        activationKey: string,
        langKey: string,
        createdBy: string,
        createdDate: Date,
        lastModifiedBy: string,
        lastModifiedDate: Date,
        authorities: Array<Role>
}

export interface AuditEvent {
    createdBy: string,
    createdDate: Date,
    operation: string,
    notes?: string
}