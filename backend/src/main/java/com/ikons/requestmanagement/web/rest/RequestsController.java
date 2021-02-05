package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.usecase.request.close.CloseRequestUseCase;
import com.ikons.requestmanagement.core.usecase.request.create.CreateNewRequestUseCase;
import com.ikons.requestmanagement.core.usecase.request.ListRequestsUseCase;
import com.ikons.requestmanagement.core.usecase.request.delete.DeleteRequestUseCase;
import com.ikons.requestmanagement.core.usecase.request.update.UpdateRequestUseCase;
import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.requests.RequestData;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import com.ikons.requestmanagement.web.rest.responses.RequestsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/requests-management/api")
public class RequestsController {

    private final ListRequestsUseCase listRequestsUseCase;
    private final CreateNewRequestUseCase createNewRequestUseCase;
    private final UpdateRequestUseCase updateRequestUseCase;
    private final CloseRequestUseCase closeRequestUseCase;
    private final DeleteRequestUseCase deleteRequestUseCase;

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

    @PostMapping("/update-request")
    public void updateRequest(@RequestBody final RequestUpdate requestUpdate) {
        updateRequestUseCase.updateRequest(requestUpdate);
    }

    @PostMapping("/close-request/{requestId}")
    public void closeRequest(@PathVariable final Long requestId) {
        closeRequestUseCase.closeRequest(requestId);
    }

    @PostMapping("delete-request/{requestId}")
    public void deleteRequest(@PathVariable final Long requestId) {
        deleteRequestUseCase.deleteRequest(requestId);
    }

}
