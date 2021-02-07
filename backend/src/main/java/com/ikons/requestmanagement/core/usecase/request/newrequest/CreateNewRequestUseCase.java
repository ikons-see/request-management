package com.ikons.requestmanagement.core.usecase.request.newrequest;


import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.core.usecase.request.GetRequest;
import com.ikons.requestmanagement.core.usecase.request.RequestActionNotification;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.User;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateNewRequestUseCase {

    private final CreateRequest createRequest;
    private final UserManagement userManagement;
    private final GetRequest getRequest;
    private final RequestActionNotification requestActionNotification;

    @Transactional
    public void createRequest(final AreaOfInterestDTO areaOfInterest, final Date startDate, final Date endDate,
                              final String projectDescription, final String otherNotes,
                              final String user,
                              final List<ResourceDTO> resources
    ) {
        final long requestId = createRequest.createNewRequest(areaOfInterest, startDate, endDate, projectDescription, otherNotes, user, resources);
        final List<String> administratorsEmails = userManagement.getAdministratorsEmails();
        final RequestMailContentDTO requestMailContent = generate(requestId);
        requestActionNotification.sendRequestCreationEmail(administratorsEmails, requestMailContent);
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
