package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import com.ikons.requestmanagement.core.dto.RequestCsvDTO;

import java.util.List;

public interface ReportResults {

  List<MonthlyReportsDto> requestsPerMonth();

  List<MonthlyReportsDto> resourcesPerMonth();

  Long totalActiveRequests();

  Long totalOnGoingRequests();

  Long totalRequests();

  List<RequestCsvDTO> requestsCsv();


}
