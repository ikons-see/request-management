package com.ikons.requestmanagement.core.usecase.request.close;

import org.springframework.stereotype.Service;

@Service
public class CloseRequestUseCase {

  private final CloseRequestProvider closeRequestProvider;

  public CloseRequestUseCase(final CloseRequestProvider closeRequestProvider) {
    this.closeRequestProvider = closeRequestProvider;
  }

  public void closeRequest(final Long requestId) {
    closeRequestProvider.close(requestId);
  }
}
