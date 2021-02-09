package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.security.AuthoritiesConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/reports")
public class ReportsController {


  @GetMapping("/total-active-requests")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void totalActiveRequests() {

  }

  @GetMapping("/total-requests-in-charge")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void totalOnGoingRequests() {

  }

  @GetMapping("/total-resources-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void totalOpenedRequests() {

  }

  @GetMapping("/total-requests-per-month")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public void totalOpenedRequests() {

  }

}
