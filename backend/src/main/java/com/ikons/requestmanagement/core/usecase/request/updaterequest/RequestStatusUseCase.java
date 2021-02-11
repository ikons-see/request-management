package com.ikons.requestmanagement.core.usecase.request.updaterequest;

import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.core.dto.RequestStateHistoryDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.RequestMailContentUseCase;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.web.rest.requests.ChangeStatusRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestStatusUseCase {

    private final UpdateRequest updateRequest;
    private final RequestDetailsManagement requestDetailsManagement;
    private final RequestMailContentUseCase requestMailContentUseCase;
    private final UserManagement userManagement;
    private final RequestActionNotification requestActionNotification;


    public void changeRequestStatus(final ChangeStatusRequest requestStatus, final String user) {
        updateRequest.changeStatus(requestStatus.getRequestId(), requestStatus.getRequestStatus(), requestStatus.getNote());
        requestDetailsManagement.logRequestState(requestStatus.getRequestId(), user, requestStatus.getRequestStatus(), requestStatus.getNote());
    }

    public List<RequestStateHistoryDTO> getRequestStateHistory(final Long requestId) {
        return requestDetailsManagement.getStateHistory(requestId);
    }

    public void sendChangeStatusEmail(final long requestId, RequestStatusDTO requestStatus) {
        final RequestMailContentDTO requestMailContent = requestMailContentUseCase.generate(requestId);
        requestMailContent.setOperation(requestStatus.name());
        final String requesterEmail = userManagement.getRequesterEmail(requestId);
        requestActionNotification.sendRequestSummaryEmail(Collections.singletonList(requesterEmail), requestMailContent);
    }
}
