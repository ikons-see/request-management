package com.ikons.requestmanagement.web.rest.requests;

import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.Resource;
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
  private AreaOfInterest areaOfInterest;
  private String status;
  private Date startDate;
  private Date endDate;
  private String projectDescription;
  private String notes;
  private List<Resource> newResources;
  private List<Long> deletedResourceIds;
}
