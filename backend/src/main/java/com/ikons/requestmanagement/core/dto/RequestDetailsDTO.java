package com.ikons.requestmanagement.core.dto;

import com.ikons.requestmanagement.core.dto.ResourceDTO;
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
public class RequestDetailsDTO {
    private long requestId;
    private String areaOfInterest;
    private String displayName;
    private String status;
    private Date startDate;
    private Date endDate;
    private String notes;
    private String statusNotes;
    private String projectDescription;
    private List<ResourceDTO> resources;
}
