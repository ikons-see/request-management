import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { RequestsListResponse } from "../types/response-types";
import { AddRequest, RequestFilters, UpdateRequest } from "../types/request-types";
import { JWTToken } from "../types/data-types";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class RequestsManagementService {

    constructor(private httpClient: HttpClient) {
    }

    getMyRequestsList(page: number, filters: RequestFilters): Observable<RequestsListResponse> {
        const request = {
            page: page,
            size: 10,
            filters: filters
        };
        //return this.httpClient.post<RequestsListResponse>(`api/requests-management/my-requests`, request);
        return of(
            {
                requestResponses: [
                    {
                        requestId: 0,
                        areaOfInterest: 'INDUSTRY',
                        status: 'CREATED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                id: 1,
                                total: 4,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS'],
                                note: ''
                            },
                            {
                                id: 2,
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS', 'Spring', 'SQL'],
                                note: ''
                            },
                            {
                                id: 3,
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS', 'Spring'],
                                note: ''
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 1,
                        areaOfInterest: 'INDUSTRY',
                        status: 'PENDING',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 2,
                        areaOfInterest: 'INDUSTRY',
                        status: 'REJECTED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 3,
                        areaOfInterest: 'INDUSTRY',
                        status: 'CLOSED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    }
                ],
                total: 2
            }
        );
    }

    getAllRequestsList(page: number, filters: RequestFilters): Observable<RequestsListResponse> {
        const request = {
            page: page,
            size: 10,
            filters: filters
        }
        //return this.httpClient.post<RequestsListResponse>(`api/requests-management/list-requests`, request);
        return of(
            {
                requestResponses: [
                    {
                        requestId: 0,
                        areaOfInterest: 'INDUSTRY',
                        status: 'CREATED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                id: 1,
                                total: 4,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS'],
                                note: ''
                            },
                            {
                                id: 2,
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS', 'Spring', 'SQL'],
                                note: ''
                            },
                            {
                                id: 3,
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java', 'HTML', 'Typescript', 'CSS', 'Spring'],
                                note: ''
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 1,
                        areaOfInterest: 'INDUSTRY',
                        status: 'PENDING',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 2,
                        areaOfInterest: 'INDUSTRY',
                        status: 'REJECTED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    },
                    {
                        requestId: 3,
                        areaOfInterest: 'INDUSTRY',
                        status: 'CLOSED',
                        startDate: new Date(),
                        endDate: new Date(),
                        projectDescription: 'Long project description',
                        resources: [
                            {
                                total: 1,
                                seniority: 'Medium',
                                skills: ['Angular', 'Java']
                            }
                        ],
                        note: ''
                    }
                ],
                total: 2
            }
        );
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
        localStorage.setItem('access_token', JSON.stringify(token.id_token));
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
        const request = {
            requestId: requestId
        };
        return this.httpClient.post<void>(`api/requests-management/close-request`, request);
    }
}
