package com.ikons.requestmanagement.core.usecase.request.updaterequest;

import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;

public interface UpdateRequest {

    void update(final RequestUpdate requestUpdate);

    void changeStatus(final long requestId, final RequestStatusDTO requestStatus, final String note);
}
