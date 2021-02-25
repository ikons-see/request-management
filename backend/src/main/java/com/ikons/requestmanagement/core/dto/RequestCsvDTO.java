package com.ikons.requestmanagement.core.dto;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RequestCsvDTO {

  @CsvBindByName(column = "Project Description")
  private String projectDescription;

  @CsvBindByName(column = "Created Date")
  private Date createdDate;

  @CsvBindByName(column = "Created By")
  private String createdBy;

  @CsvBindByName(column = "Total resources")
  private Long total;

  @CsvBindByName(column = "Total provided resources")
  private Long totalProvided;
}
