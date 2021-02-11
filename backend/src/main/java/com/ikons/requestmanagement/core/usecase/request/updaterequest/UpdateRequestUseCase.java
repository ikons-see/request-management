package com.ikons.requestmanagement.core.usecase.request.updaterequest;


import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.RequestMailContentUseCase;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class UpdateRequestUseCase {

    private final UpdateRequest updateRequest;
    private final RequestDetailsManagement requestDetailsManagement;
    private final RequestMailContentUseCase requestMailContentUseCase;
    private final RequestActionNotification requestActionNotification;
    private final UserManagement userManagement;


    public void updateRequest(final RequestUpdate requestDetails, String user) {
        updateRequest.update(requestDetails);
        requestDetailsManagement.logRequestState(requestDetails.getRequestId(), user, RequestStatusDTO.UPDATED, requestDetails.getNotes());
        sendRequestUpdateEmail(requestDetails.getRequestId());
    }

    public void sendRequestUpdateEmail(final long requestId) {
        final RequestMailContentDTO requestMailContent = requestMailContentUseCase.generate(requestId);
        requestMailContent.setOperation(RequestStatusDTO.UPDATED.name());
        final List<String> administratorsEmails = userManagement.getAdministratorsEmails();
        try {
            requestActionNotification.sendRequestSummaryEmail(administratorsEmails, requestMailContent);
        } catch (MailSendException e) {
            log.debug("error sending email", e);
        }
    }
}
