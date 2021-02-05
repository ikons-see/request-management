package com.ikons.requestmanagement.web.rest.requests;

import java.util.Date;
import java.util.List;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestData {
    private AreaOfInterestDTO areaOfInterest;
    private Date startDate;
    private Date endDate;
    private String projectDescription;
    private String otherNotes;
    private List<ResourceDTO> resources;
}
