package com.ikons.requestmanagement.core.usecase.request.newrequest;


import com.ikons.requestmanagement.core.dto.*;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.RequestMailContentUseCase;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;
import org.zalando.problem.Status;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class CreateNewRequestUseCase {

  private final CreateRequest createRequest;
  private final UserManagement userManagement;
  private final RequestDetailsManagement requestDetailsManagement;
  private final RequestActionNotification requestActionNotification;
  private final RequestMailContentUseCase requestMailContentUseCase;

  public void createRequest(
      final AreaOfInterestDTO areaOfInterest,
      final Instant startDate,
      final Instant endDate,
      final String projectDescription,
      final String otherNotes,
      final String user,
      final List<ResourceDTO> resources
  ) {
    final long requestId = createRequest.createNewRequest(areaOfInterest, startDate, endDate, projectDescription, otherNotes, user, resources);
    requestDetailsManagement.logRequestState(requestId, user, RequestStatusDTO.CREATED, null);
    sendRequestCreationEmail(requestId);
  }

  public void sendRequestCreationEmail(final Long requestId) {
    final List<String> administratorsEmails = userManagement.getAdministratorsEmails();
    final RequestMailContentDTO requestMailContent = requestMailContentUseCase.generate(requestId);
    requestMailContent.setOperation(RequestStatusDTO.CREATED.name());
    try {
      requestActionNotification.sendRequestSummaryEmail(administratorsEmails, requestMailContent);
    } catch (MailSendException e) {
      log.debug("error sending email", e);
    }
  }

}
