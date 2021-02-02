package com.ikons.requestmanagement.core.usecase.request;


import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.responses.RequestDetails;

import java.util.List;

public interface GetRequest {

    RequestDetails getRequestDetails(final long requestId);

    List<RequestDetails> getAllRequests(final PaginationParams paginationParams);

    long countAllRequests();

    long countUserRequests(final Long loggedUser);

    List<RequestDetails> getUserRequests(final Long loggedUser, final PaginationParams paginationParams);
}
