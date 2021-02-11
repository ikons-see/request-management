package com.ikons.requestmanagement.core.usecase.request.closerequest;

import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.RequestMailContentUseCase;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class CloseRequestUseCase {

    private final CloseRequest closeRequest;
    private final RequestMailContentUseCase requestMailContentUseCase;
    private final UserManagement userManagement;
    private final RequestActionNotification requestActionNotification;
    private final RequestDetailsManagement requestDetailsManagement;


    public void closeRequest(final Long requestId, String user) {
        closeRequest.close(requestId);
        requestDetailsManagement.logRequestState(requestId, user, RequestStatusDTO.CLOSED, "notess");
        sendRequestCloseEmail(requestId);
    }

    public void sendRequestCloseEmail(final Long requestId) {
        final List<String> administratorsEmails = userManagement.getAdministratorsEmails();
        final RequestMailContentDTO requestMailContent = requestMailContentUseCase.generate(requestId);
        requestMailContent.setOperation(RequestStatusDTO.CLOSED.name());
        try {
            requestActionNotification.sendRequestSummaryEmail(administratorsEmails, requestMailContent);
        } catch (MailSendException e) {
            log.debug("error sending email", e);
        }
    }
}
