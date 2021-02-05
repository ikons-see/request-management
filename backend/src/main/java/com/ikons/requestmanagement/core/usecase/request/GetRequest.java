package com.ikons.requestmanagement.core.usecase.request;


import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GetRequest {

    RequestDetailsDTO getRequestDetails(final long requestId);

    List<RequestDetailsDTO> getAllRequests(final Pageable pageable);

    long countAllRequests();

    long countUserRequests(final String loggedUser);

    List<RequestDetailsDTO> getUserRequests(final String loggedUser, final Pageable pageable);
}
