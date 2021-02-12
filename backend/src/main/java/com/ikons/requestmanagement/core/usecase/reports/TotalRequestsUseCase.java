package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.TotalReportsDto;
import org.springframework.stereotype.Service;

@Service
public class TotalRequestsUseCase {

  private final ReportResults reportResults;

  public TotalRequestsUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public TotalReportsDto getActiveRequests(){
    return TotalReportsDto.builder()
        .totalActiveRequests(reportResults.totalActiveRequests())
        .totalOnGoingRequests(reportResults.totalOnGoingRequests())
        .totalRequests(reportResults.totalRequests())
        .build();
  }
}
