package com.ikons.requestmanagement.core.usecase.request;

import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.responses.RequestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListRequestsUseCase {
    private final GetRequest getRequest;

    public RequestsResponse getAllRequests(final PaginationParams paginationParams) {
        return RequestsResponse.builder()
                .requestResponses(getRequest.getAllRequests(paginationParams))
                .total(getRequest.countAllRequests()).build();
    }

    public RequestsResponse getUserRequests(final Long loggedUser, final PaginationParams paginationParams) {
        return RequestsResponse.builder()
                .requestResponses(getRequest.getUserRequests(loggedUser, paginationParams))
                .total(getRequest.countUserRequests(loggedUser)).build();
    }
}
