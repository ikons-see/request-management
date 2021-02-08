package com.ikons.requestmanagement.core.usecase.request.getrequests;

import com.ikons.requestmanagement.core.criteria.RequestCriteria;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.dto.RequestsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListRequestsUseCase {
    private final RequestDetailsManagement getRequest;

    public RequestsDTO getAllRequests(final Pageable paginationParams) {
        return RequestsDTO.builder()
                .requestResponses(getRequest.getAllRequests(paginationParams))
                .total(getRequest.countAllRequests()).build();
    }

    public Page<RequestDetailsDTO> getRequests(final RequestCriteria criteria, final Pageable pageable) {
        return getRequest.getRequests(criteria, pageable);
    }

    public RequestsDTO getUserRequests(final String loggedUser, final Pageable paginationParams) {
        return RequestsDTO.builder()
                .requestResponses(getRequest.getUserRequests(loggedUser, paginationParams))
                .total(getRequest.countUserRequests(loggedUser)).build();
    }

}
