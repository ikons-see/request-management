import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, of } from "rxjs";
import { AccountData, AuditEvent, RequestsListResponse } from "../types/response-types";
import {
  AddRequest,
  ChangeStatusRequest,
  RegisterUserRequest,
  RequestDetails,
  UpdateRequest
} from "../types/request-types";
import { JWTToken } from "../types/data-types";
import { tap } from "rxjs/operators";
import {createRequestOption} from "./http-rest-utils";

@Injectable({
    providedIn: 'root'
})

export class RequestsManagementService {

    constructor(private httpClient: HttpClient) {
    }

    getMyRequestsList(page: number): Observable<RequestsListResponse> {
        const request = {
            page: page,
            size: 10
        };
        return this.httpClient.post<RequestsListResponse>(`api/requests-management/my-requests`, request);
    }

    getAllRequestsList(page: number): Observable<RequestsListResponse> {
        const request = {
            page: page,
            size: 10
        }
        return this.httpClient.post<RequestsListResponse>(`api/requests-management/list-requests`, request);
    }

    getRequests(req?: any): Observable<HttpResponse<RequestDetails[]>> {
      const options = createRequestOption(req);
      return this.httpClient.get<RequestDetails[]>('api/requests-management/requests', {params: options, observe: 'response'});
    }

    addNewRequest(request: AddRequest): Observable<void> {
        return this.httpClient.post<void>(`api/requests-management/create-new-request`, request);
    }

    updateRequest(request: UpdateRequest): Observable<void> {
        return this.httpClient.post<void>(`api/requests-management/update-request`, request);
    }

    requestToken(username: string, password: string, rememberMe: boolean): Observable<JWTToken> {
        const body = {
            'username': username,
            'password': password,
            'rememberMe': rememberMe
        };

        return this.httpClient
            .post<JWTToken>('/api/authenticate', body)
            .pipe(
                tap(token => {
                    this.saveToken(token);
                })
            );
    }

    saveToken(token: JWTToken) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('access_token', token.id_token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    removeToken() {
        localStorage.clear();
    }

    deleteRequest(requestId: number): Observable<void> {
        const request = {
            requestId: requestId
        };
        return this.httpClient.post<void>(`api/requests-management/delete-request`, request);
    }

    closeRequest(requestId: number): Observable<void> {
        return this.httpClient.get<void>(`api/requests-management/close-request/${requestId}`);
    }

    changeRequestStatus(request: ChangeStatusRequest) {
        return this.httpClient.post<void>(`api/requests-management/change-status`, request);
    }

    registerUser(request: RegisterUserRequest) {
        return this.httpClient.post<void>(`api/register`, request);
    }

    getUserInfo() {
        return this.httpClient.get<AccountData>(`api/account`);
    }

    getStatusLog(requestId: number): Observable<Array<AuditEvent>> {
        return this.httpClient.get<Array<AuditEvent>>(`api/requests-management/state-history/${requestId}`);
    }
}
