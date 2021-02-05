package com.ikons.requestmanagement.core.usecase.request.delete;

import org.springframework.stereotype.Service;

@Service
public class DeleteRequestUseCase {

  private final DeleteRequestProvider requestProvider;

  public DeleteRequestUseCase(final DeleteRequestProvider requestProvider) {
    this.requestProvider = requestProvider;
  }

  public void deleteRequest(final Long requestId) {
    requestProvider.delete(requestId);
  }
}
