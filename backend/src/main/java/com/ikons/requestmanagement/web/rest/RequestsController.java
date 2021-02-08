package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.dto.SeniorityDTO;
import com.ikons.requestmanagement.core.dto.SkillsDTO;
import com.ikons.requestmanagement.core.usecase.request.newrequest.CreateNewRequestUseCase;
import com.ikons.requestmanagement.core.usecase.request.getrequests.ListRequestsUseCase;
import com.ikons.requestmanagement.core.usecase.request.updaterequest.RequestStatusUseCase;
import com.ikons.requestmanagement.security.SecurityUtils;
import com.ikons.requestmanagement.web.rest.requests.ChangeStatusRequest;
import com.ikons.requestmanagement.web.rest.requests.RequestData;
import com.ikons.requestmanagement.core.dto.RequestsDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("api/requests-management")
public class RequestsController {

    private final ListRequestsUseCase listRequestsUseCase;
    private final CreateNewRequestUseCase createNewRequestUseCase;
    private final RequestStatusUseCase requestStatusUseCase;

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
        createNewRequestUseCase.createRequest(requestData.getAreaOfInterest(), requestData.getStartDate(), requestData.getEndDate(),
                requestData.getProjectDescription(), requestData.getOtherNotes(), user.get(), requestData.getResources()
        );
    }

    @PostMapping("/my-requests")
    public ResponseEntity<RequestsDTO> listUserRequests(final Pageable page) {
        Optional<RequestsDTO> requestsDTO = SecurityUtils.getCurrentUserLogin().map(login -> listRequestsUseCase.getUserRequests(login, page));
        return ResponseEntity.of(requestsDTO);
    }

    @PostMapping("/list-requests")
    public RequestsDTO listRequests(@RequestBody final Pageable pageable) {
        return listRequestsUseCase.getAllRequests(pageable);
    }

    @PostMapping("/change-status")
    public void changeStatus(@RequestBody final ChangeStatusRequest changeStatusRequest) {
        requestStatusUseCase.changeRequestStatus(changeStatusRequest);
    }
}
