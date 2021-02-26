package com.ikons.requestmanagement.core.dto;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ResourcesCsvDTO {

  @CsvBindByName(column = "Project Description")
  private String projectDescription;

  @CsvBindByName(column = "Total resources")
  private Integer total;

  @CsvBindByName(column = "Total provided resources")
  private Integer totalProvided;

  @CsvBindByName(column = "Skills")
  private String skills;

  @CsvBindByName(column = "Seniority")
  private String seniority;
}
