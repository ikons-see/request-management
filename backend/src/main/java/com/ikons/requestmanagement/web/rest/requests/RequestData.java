package com.ikons.requestmanagement.web.rest.requests;

import java.util.Date;
import java.util.List;

import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestData {
    private AreaOfInterest areaOfInterest;
    private Date startDate;
    private Date endDate;
    private String projectDescription;
    private String otherNotes;
    private List<Resource> resources;
}
