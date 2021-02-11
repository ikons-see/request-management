package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TotalResourcesPerMonthUseCase {

  private final ReportResults reportResults;

  public TotalResourcesPerMonthUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public List<MonthlyReportsDto> totalResourcesPerMonth(){
    return reportResults.resourcesPerMonth();
  }
}
