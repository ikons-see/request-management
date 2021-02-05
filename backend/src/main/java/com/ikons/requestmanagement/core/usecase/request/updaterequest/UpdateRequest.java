package com.ikons.requestmanagement.core.usecase.request.updaterequest;

import com.ikons.requestmanagement.core.dto.RequestStatusDTO;

public interface UpdateRequest {
    void changeStatus(long requestId, RequestStatusDTO requestStatus);
}
