import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { RequestsListResponse } from "./types/response-types";
import { AddRequest, UpdateRequest } from "./types/request-types";

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

    deleteRequest(requestId: number): Observable<void> {
        const request = {
            requestId: requestId
        };
        return this.httpClient.post<void>(`requests-management/api/delete-request`, request); 
    }
}