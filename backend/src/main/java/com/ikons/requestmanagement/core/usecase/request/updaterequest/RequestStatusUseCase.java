package com.ikons.requestmanagement.core.usecase.request.updaterequest;

import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.usecase.request.exception.MissingRequestException;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import com.ikons.requestmanagement.web.rest.requests.ChangeStatusRequest;
import org.springframework.stereotype.Service;

@Service
public class RequestStatusUseCase {
    private final UpdateRequest updateRequest;

    public RequestStatusUseCase(final UpdateRequest updateRequest) {
        this.updateRequest = updateRequest;
    }

    public void changeRequestStatus(final ChangeStatusRequest requestStatus) {
        updateRequest.changeStatus(requestStatus.getRequestId(), requestStatus.getRequestStatus(), requestStatus.getNote());
    }

}
