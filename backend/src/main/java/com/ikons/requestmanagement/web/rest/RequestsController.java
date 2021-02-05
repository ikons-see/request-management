package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.RequestStatus;
import com.ikons.requestmanagement.core.entity.Seniority;
import com.ikons.requestmanagement.core.entity.Skills;
import com.ikons.requestmanagement.core.usecase.request.CreateNewRequestUseCase;
import com.ikons.requestmanagement.core.usecase.request.ListRequestsUseCase;
import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.requests.RequestData;
import com.ikons.requestmanagement.web.rest.responses.RequestsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/requests-management/api/request")
public class RequestsController {

    private final ListRequestsUseCase listRequestsUseCase;
    private final CreateNewRequestUseCase createNewRequestUseCase;

    @PostMapping("/statuses")
    public List<String> getRequestStatuses() {
        return Stream.of(RequestStatus.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @PostMapping("/skills")
    public List<String> getSkills() {
        return Stream.of(Skills.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @PostMapping("/area-of-interest")
    public List<String> getAreaOfInterest() {
        return Stream.of(AreaOfInterest.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @PostMapping("/seniority")
    public List<String> getSeniority() {
        return Stream.of(Seniority.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @PostMapping("/create-new-request")
    public void createNewRequest(@RequestBody final RequestData requestData, @RequestHeader("Cre-User-Id") final Long userId) {
        createNewRequestUseCase.createRequest(requestData.getAreaOfInterest(), requestData.getStartDate(), requestData.getEndDate(),
                requestData.getProjectDescription(), requestData.getOtherNotes(), userId, requestData.getResources()
        );
    }

    @PostMapping("/my-requests")
    public RequestsResponse listUserRequests(@RequestBody final PaginationParams paginationParams) {
        return listRequestsUseCase.getUserRequests(1L, paginationParams);
    }
}
