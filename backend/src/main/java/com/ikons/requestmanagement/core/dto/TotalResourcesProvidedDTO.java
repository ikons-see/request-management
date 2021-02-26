package com.ikons.requestmanagement.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TotalResourcesProvidedDTO {

  private Long totalRequiredResources;
  private Long totalProvidedResources;

}
