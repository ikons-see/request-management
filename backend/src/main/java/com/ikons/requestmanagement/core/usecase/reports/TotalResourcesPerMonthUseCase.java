package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import com.ikons.requestmanagement.core.dto.ReportsResponseDto;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalResourcesPerMonthUseCase {

  private final ReportResults reportResults;

  public TotalResourcesPerMonthUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public List<ReportsResponseDto> totalResourcesPerMonth(){

    final List<MonthlyReportsDto> resourcesPerMonth = reportResults.resourcesPerMonth();
    return resourcesPerMonth.stream().map(period -> {
      final Calendar calendar = Calendar.getInstance();
      calendar.set(Calendar.YEAR, period.getYear());
      calendar.set(Calendar.MONTH, period.getMonth());
      return ReportsResponseDto.builder()
          .period(calendar.getTime())
          .total(period.getTotal())
          .build();
    }).collect(Collectors.toList());
  }
}
