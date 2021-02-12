package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import com.ikons.requestmanagement.core.dto.ReportsResponseDto;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalRequestsPerMonthUseCase {

  private final ReportResults reportResults;

  public TotalRequestsPerMonthUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public List<ReportsResponseDto> totalRequestsPerMonth() {

    final List<MonthlyReportsDto> requestsPerMonth = reportResults.requestsPerMonth();
    return requestsPerMonth.stream().map(period -> {
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
