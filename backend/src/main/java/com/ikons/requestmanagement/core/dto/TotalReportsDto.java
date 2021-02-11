package com.ikons.requestmanagement.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TotalReportsDto {

  private Long totalActiveRequests;
  private Long totalOnGoingRequests;
  private Long totalRequests;
}
