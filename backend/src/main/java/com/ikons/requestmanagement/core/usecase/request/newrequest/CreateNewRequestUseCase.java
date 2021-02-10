package com.ikons.requestmanagement.core.usecase.request.newrequest;


import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class CreateNewRequestUseCase {

  private final CreateRequest createRequest;
  private final UserManagement userManagement;
  private final RequestDetailsManagement getRequest;
  private final RequestActionNotification requestActionNotification;

  @Transactional
  public Long createRequest(
      final AreaOfInterestDTO areaOfInterest,
      final Instant startDate,
      final Instant endDate,
      final String projectDescription,
      final String otherNotes,
      final String user,
      final List<ResourceDTO> resources
  ) {
    final long requestId = createRequest.createNewRequest(areaOfInterest, startDate, endDate, projectDescription, otherNotes, user, resources);
    return requestId;
  }

  public void sendRequestCreationEmail(final Long requestId) {
    final List<String> administratorsEmails = userManagement.getAdministratorsEmails();
    final RequestMailContentDTO requestMailContent = generate(requestId);
    try {
      requestActionNotification.sendRequestCreationEmail(administratorsEmails, requestMailContent);
    } catch (MailSendException e) {
      log.debug("error sending email", e);
    }
  }

  private RequestMailContentDTO generate(final long requestId) {
    final RequestDetailsDTO requestDetails = getRequest.getRequestDetails(requestId);
    return RequestMailContentDTO.builder()
        .requestId(requestId)
        .areaOfInterest(requestDetails.getAreaOfInterest())
        .startDate(requestDetails.getStartDate())
        .endDate(requestDetails.getEndDate())
        .notes(requestDetails.getNotes())
        .projectDescription(requestDetails.getProjectDescription())
        .displayName(requestDetails.getDisplayName())
        .resources(requestDetails.getResources())
        .build();
  }
}
