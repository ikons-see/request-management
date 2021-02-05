package com.ikons.requestmanagement.core.usecase.request.newrequest;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;

import java.util.Date;
import java.util.List;

public interface CreateRequest {

    long createNewRequest(final AreaOfInterestDTO areaOfInterest, final Date startDate, final Date endDate, final String projectDescription, final String otherNotes, final String userId, final List<ResourceDTO> resources);

}
