package com.ikons.requestmanagement.web.rest.responses;

import com.ikons.requestmanagement.core.entity.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetails {
    private long requestId;
    private String areaOfInterest;
    private String displayName;
    private String status;
    private Date startDate;
    private Date endDate;
    private String notes;
    private String projectDescription;
    private List<Resource> resources;
}
