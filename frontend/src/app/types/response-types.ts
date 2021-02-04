import { RequestDetails } from "./request-types";

export interface RequestsListResponse {
    requestResponses: Array<RequestDetails>;
    total: number;
}