package com.ikons.requestmanagement.core.usecase.request;


import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateNewRequestUseCase {

    private final CreateRequest createRequest;

    public void createRequest(final AreaOfInterest areaOfInterest, final Date startDate, final Date endDate,
                              final String projectDescription, final String otherNotes,
                              final Long userId,
                              final List<Resource> resources
    ) {
        final long requestId = createRequest.createNewRequest(areaOfInterest, startDate, endDate, projectDescription, otherNotes, userId, resources);
        // final List<UserEntity> administrators = getUsers.getAdministrators();
        // sendRequestCreationEmailUseCase.sendActivationMail(administrators, requestId);
    }
}
