package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TotalRequestsPerMonthUseCase {

  private final ReportResults reportResults;

  public TotalRequestsPerMonthUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public List<MonthlyReportsDto> totalRequestsPerMonth(){
    final List<MonthlyReportsDto> requestsPerMonth = reportResults.requestsPerMonth();
    return requestsPerMonth;
  }
}
