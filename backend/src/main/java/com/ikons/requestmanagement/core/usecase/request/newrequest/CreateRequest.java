package com.ikons.requestmanagement.core.usecase.request.newrequest;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;

import java.time.Instant;
import java.util.Date;
import java.util.List;

public interface CreateRequest {

    long createNewRequest(
        final AreaOfInterestDTO areaOfInterest,
        final Instant startDate,
        final Instant endDate,
        final String projectDescription,
        final String otherNotes,
        final String userId,
        final List<ResourceDTO> resources
    );

}
