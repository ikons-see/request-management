package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;

import java.util.List;

public interface ReportResults {

  List<MonthlyReportsDto> requestsPerMonth();

  List<MonthlyReportsDto> resourcesPerMonth();

  Long totalActiveRequests();

  Long totalOnGoingRequests();

  Long totalRequests();
}
