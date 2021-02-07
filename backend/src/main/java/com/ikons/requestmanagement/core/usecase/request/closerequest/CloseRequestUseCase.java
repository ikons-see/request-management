package com.ikons.requestmanagement.core.usecase.request.closerequest;

import org.springframework.stereotype.Service;

@Service
public class CloseRequestUseCase {

  private final CloseRequest closeRequest;

  public CloseRequestUseCase(final CloseRequest closeRequest) {
    this.closeRequest = closeRequest;
  }

  public void closeRequest(final Long requestId) {
    closeRequest.close(requestId);
  }
}
