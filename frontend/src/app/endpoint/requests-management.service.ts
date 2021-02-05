import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { RequestsListResponse } from "../types/response-types";
import { AddRequest, UpdateRequest } from "../types/request-types";
import { JWTToken } from "../types/data-types";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class RequestsManagementService {

    constructor(private httpClient: HttpClient) {
    }

    getRequestsList(page: number): Observable<RequestsListResponse> {
        const request = {
            page: page,
            size: 10
        };
        //return this.httpClient.post<RequestsListResponse>(`requests-management/api/my-requests`, request);
        return of(
            {
                requestResponses: [
                    {
                        requestId: 0,
                        areaOfInterest: 'Long inserted are of interest inp',
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
                        status: 'CREATED',
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
        return this.httpClient.post<void>(`requests-management/api/create-new-request`, request);
    }

    updateRequest(request: UpdateRequest): Observable<void> {
        return this.httpClient.post<void>(`requests-management/api/update-request`, request);
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
}