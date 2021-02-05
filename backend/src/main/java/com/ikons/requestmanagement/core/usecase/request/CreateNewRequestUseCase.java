package com.ikons.requestmanagement.core.usecase.request;


import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.RequestMailContent;
import com.ikons.requestmanagement.core.entity.Resource;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.User;
import com.ikons.requestmanagement.web.rest.responses.RequestDetails;
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
    public void createRequest(final AreaOfInterest areaOfInterest, final Date startDate, final Date endDate,
                              final String projectDescription, final String otherNotes,
                              final Long userId,
                              final List<Resource> resources
    ) {
        final long requestId = createRequest.createNewRequest(areaOfInterest, startDate, endDate, projectDescription, otherNotes, userId, resources);
         final List<User> administrators = userManagement.getAdministrators();
         final RequestMailContent requestMailContent = generate(requestId);
         requestActionNotification.sendRequestCreationEmail(administrators, requestMailContent);
    }
    private RequestMailContent generate(final long requestId) {
        final RequestDetails requestDetails = getRequest.getRequestDetails(requestId);
        return RequestMailContent.builder()
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
