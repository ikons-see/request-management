package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.ReportsResponseDto;
import com.ikons.requestmanagement.core.dto.TotalReportsDto;
import com.ikons.requestmanagement.core.dto.TotalResourcesProvidedDTO;
import com.ikons.requestmanagement.core.usecase.reports.*;
import com.ikons.requestmanagement.security.AuthoritiesConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/reports")
public class ReportsResource {

  private final TotalRequestsPerMonthUseCase totalRequestsPerMonthUseCase;
  private final TotalRequestsUseCase totalRequestsUseCase;
  private final TotalResourcesPerMonthUseCase totalResourcesPerMonthUseCase;
  private final WriteDataToCSVUseCase writeDataToCSVUseCase;
  private final TotalResourcesProvidedUseCase totalResourcesProvidedUseCase;
  private final WriteResourcesToCsvUseCase writeResourcesToCsvUseCase;

  @GetMapping("/total-requests")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public TotalReportsDto totalRequests() {
    return totalRequestsUseCase.getActiveRequests();
  }

  @GetMapping("/provided-resources")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public TotalResourcesProvidedDTO totalResourcesProvided() {
    return totalResourcesProvidedUseCase.totalResourcesProvided();
  }

  @GetMapping("/total-resources-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public List<ReportsResponseDto> totalRequestsPerMonth() {
    return totalResourcesPerMonthUseCase.totalResourcesPerMonth();
  }

  @GetMapping("/total-requests-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public List<ReportsResponseDto> totalResourcesPerMonth() {
    return totalRequestsPerMonthUseCase.totalRequestsPerMonth();
  }

  @GetMapping("/download-requests-csv")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void downloadCSV(HttpServletResponse response) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("dd_MM_yyyy");
    response.setContentType("text/csv");
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=requests_"+ sdf.format(Calendar.getInstance().getTime()) +".csv");
    writeDataToCSVUseCase.writeDataToCsv(response.getWriter());
  }

  @GetMapping("/download-resources-csv")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void downloadResourcesCSV(HttpServletResponse response) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("dd_MM_yyyy");
    response.setContentType("text/csv");
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=resources_"+ sdf.format(Calendar.getInstance().getTime()) +".csv");
    writeResourcesToCsvUseCase.writeResourcesToCsv(response.getWriter());
  }

}
