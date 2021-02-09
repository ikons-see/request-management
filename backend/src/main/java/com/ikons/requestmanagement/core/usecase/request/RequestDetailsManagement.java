package com.ikons.requestmanagement.core.usecase.request;


import com.ikons.requestmanagement.core.criteria.RequestCriteria;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RequestDetailsManagement {

    RequestDetailsDTO getRequestDetails(final long requestId);

    List<RequestDetailsDTO> getAllRequests(final Pageable pageable);
    Page<RequestDetailsDTO> getRequests(
        final RequestCriteria requestCriteria,
        final Pageable pageable
    );

    long countAllRequests();

    // FIXME not needed
    long countUserRequests(final String loggedUser);

    List<RequestDetailsDTO> getUserRequests(final String loggedUser, final Pageable pageable);
}
