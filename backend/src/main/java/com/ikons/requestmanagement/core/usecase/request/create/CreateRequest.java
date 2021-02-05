package com.ikons.requestmanagement.core.usecase.request.create;

import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.Resource;

import java.util.Date;
import java.util.List;

public interface CreateRequest {
    long createNewRequest(final AreaOfInterest areaOfInterest, final Date startDate, final Date endDate, final String projectDescription, final String otherNotes, final Long userId, final List<Resource> resources);


}
