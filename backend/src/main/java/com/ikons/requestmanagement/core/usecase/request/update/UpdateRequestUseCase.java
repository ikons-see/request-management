package com.ikons.requestmanagement.core.usecase.request.update;


import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import org.springframework.stereotype.Service;

@Service
public class UpdateRequestUseCase {

  private final UpdateRequestProvider requestProvider;

  public UpdateRequestUseCase(final UpdateRequestProvider requestProvider) {
    this.requestProvider = requestProvider;
  }

  public void updateRequest(final RequestUpdate requestDetails) {
    requestProvider.update(requestDetails);
  }
}
