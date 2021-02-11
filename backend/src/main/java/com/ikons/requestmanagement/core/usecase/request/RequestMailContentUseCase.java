package com.ikons.requestmanagement.core.usecase.request;

import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.RequestMailContentDTO;
import org.springframework.stereotype.Service;

@Service
public class RequestMailContentUseCase {
    private final RequestDetailsManagement requestDetailsManagement;

    public RequestMailContentUseCase(final RequestDetailsManagement requestDetailsManagement) {
        this.requestDetailsManagement = requestDetailsManagement;
    }

    public RequestMailContentDTO generate(final long requestId) {
        final RequestDetailsDTO requestDetails = requestDetailsManagement.getRequestDetails(requestId);
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
