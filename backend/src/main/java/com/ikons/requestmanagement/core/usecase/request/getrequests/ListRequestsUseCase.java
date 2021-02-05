package com.ikons.requestmanagement.core.usecase.request.getrequests;

import com.ikons.requestmanagement.core.usecase.request.GetRequest;
import com.ikons.requestmanagement.core.dto.RequestsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListRequestsUseCase {
    private final GetRequest getRequest;

    public RequestsDTO getAllRequests(final Pageable paginationParams) {
        return RequestsDTO.builder()
                .requestResponses(getRequest.getAllRequests(paginationParams))
                .total(getRequest.countAllRequests()).build();
    }

    public RequestsDTO getUserRequests(final String loggedUser, final Pageable paginationParams) {
        return RequestsDTO.builder()
                .requestResponses(getRequest.getUserRequests(loggedUser, paginationParams))
                .total(getRequest.countUserRequests(loggedUser)).build();
    }
}