package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.criteria.RequestCriteria;
import com.ikons.requestmanagement.core.dto.*;
import com.ikons.requestmanagement.core.usecase.request.getrequests.ListRequestsUseCase;
import com.ikons.requestmanagement.core.usecase.request.newrequest.CreateNewRequestUseCase;
import com.ikons.requestmanagement.security.AuthoritiesConstants;
import com.ikons.requestmanagement.security.SecurityUtils;
import com.ikons.requestmanagement.web.rest.requests.RequestData;
import com.ikons.web.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/requests-management/request")
public class RequestsResource {

  private final ListRequestsUseCase listRequestsUseCase;
  private final CreateNewRequestUseCase createNewRequestUseCase;

  @PostMapping("/statuses")
  public List<String> getRequestStatuses() {
    return Stream.of(RequestStatusDTO.values())
        .map(Enum::name)
        .collect(Collectors.toList());
  }

  @PostMapping("/skills")
  public List<String> getSkills() {
    return Stream.of(SkillsDTO.values())
        .map(Enum::name)
        .collect(Collectors.toList());
  }

  @PostMapping("/area-of-interest")
  public List<String> getAreaOfInterest() {
    return Stream.of(AreaOfInterestDTO.values())
        .map(Enum::name)
        .collect(Collectors.toList());
  }

  @PostMapping("/seniority")
  public List<String> getSeniority() {
    return Stream.of(SeniorityDTO.values())
        .map(Enum::name)
        .collect(Collectors.toList());
  }

  @PostMapping("/create-new-request")
  public void createNewRequest(@RequestBody final RequestData requestData) {
    Optional<String> user = SecurityUtils.getCurrentUserLogin();
    createNewRequestUseCase.createRequest(
        requestData.getAreaOfInterest(),
        requestData.getStartDate(),
        requestData.getEndDate(),
        requestData.getProjectDescription(),
        requestData.getOtherNotes(),
        user.get(),
        requestData.getResources()
    );
  }

  @PostMapping("/my-requests")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
  public ResponseEntity<RequestsDTO> listUserRequests(final Pageable page) {
    Optional<RequestsDTO> requestsDTO = SecurityUtils.getCurrentUserLogin().map(login -> listRequestsUseCase.getUserRequests(login, page));
    return ResponseEntity.of(requestsDTO);
  }

  @PostMapping("/list-requests")
  public RequestsDTO listRequests(@RequestBody final Pageable pageable) {
    return listRequestsUseCase.getAllRequests(pageable);
  }

  @GetMapping("/")
  public ResponseEntity<List<RequestDetailsDTO>> getRequests(
      final RequestCriteria criteria,
      final Pageable pageable
  ) {
      Page<RequestDetailsDTO> page = listRequestsUseCase.getRequests(criteria, pageable);
      HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(
          ServletUriComponentsBuilder.fromCurrentRequest(),
          page
      );
      return ResponseEntity.ok().headers(headers).body(page.getContent());
  }

}
