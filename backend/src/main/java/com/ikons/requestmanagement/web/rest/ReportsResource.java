package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import com.ikons.requestmanagement.core.dto.TotalReportsDto;
import com.ikons.requestmanagement.core.usecase.reports.TotalRequestsUseCase;
import com.ikons.requestmanagement.core.usecase.reports.TotalRequestsPerMonthUseCase;
import com.ikons.requestmanagement.core.usecase.reports.TotalResourcesPerMonthUseCase;
import com.ikons.requestmanagement.security.AuthoritiesConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/reports")
public class ReportsResource {

  private final TotalRequestsPerMonthUseCase totalRequestsPerMonthUseCase;
  private final TotalRequestsUseCase totalRequestsUseCase;
  private final TotalResourcesPerMonthUseCase totalResourcesPerMonthUseCase;

  @GetMapping("/total-requests")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public TotalReportsDto totalRequests() {
    return totalRequestsUseCase.getActiveRequests();
  }


  @GetMapping("/total-resources-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public List<MonthlyReportsDto> totalRequestsPerMonth() {
    return totalResourcesPerMonthUseCase.totalResourcesPerMonth();
  }

  @GetMapping("/total-requests-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public List<MonthlyReportsDto> totalResourcesPerMonth() {
    return totalRequestsPerMonthUseCase.totalRequestsPerMonth();
  }

}
