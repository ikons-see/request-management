package com.ikons.requestmanagement.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyReportsDto {

  private Integer year;
  private Integer month;
  private Long total;
}
