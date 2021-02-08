package com.ikons.requestmanagement.core.usecase.request.updaterequest;

import com.ikons.requestmanagement.core.dto.RequestStatusDTO;

public interface UpdateRequest {

    void changeStatus(final long requestId, final RequestStatusDTO requestStatus, final String note);
}
