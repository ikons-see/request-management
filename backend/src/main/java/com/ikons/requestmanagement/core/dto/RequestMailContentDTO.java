package com.ikons.requestmanagement.core.dto;

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
public class RequestMailContentDTO {

  private String displayName;
  private String userEmail;
  private long requestId;
  private String areaOfInterest;
  private Date startDate;
  private Date endDate;
  private String notes;
  private String projectDescription;
  private List<ResourceDTO> resources;

}
