package com.ikons.requestmanagement.core.usecase.request.updaterequest;


import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import org.springframework.stereotype.Service;

@Service
public class UpdateRequestUseCase {

  private final UpdateRequest updateRequest;

  public UpdateRequestUseCase(UpdateRequest updateRequest) {
    this.updateRequest = updateRequest;
  }

  public void updateRequest(final RequestUpdate requestDetails) {
    updateRequest.update(requestDetails);
  }
}
