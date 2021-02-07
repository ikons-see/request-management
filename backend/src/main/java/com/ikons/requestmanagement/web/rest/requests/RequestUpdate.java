package com.ikons.requestmanagement.web.rest.requests;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestUpdate {

  private long requestId;
  private AreaOfInterestDTO areaOfInterest;
  private Date startDate;
  private Date endDate;
  private String projectDescription;
  private String notes;
  private List<ResourceDTO> newResources;
  private List<Long> deletedResourceIds;
}
