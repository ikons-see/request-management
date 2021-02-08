package com.ikons.requestmanagement.core.usecase.request.deleterequest;

import org.springframework.stereotype.Service;

@Service
public class DeleteRequestUseCase {

  private final DeleteRequest requestProvider;

  public DeleteRequestUseCase(final DeleteRequest requestProvider) {
    this.requestProvider = requestProvider;
  }

  public void deleteRequest(final Long requestId) {
    requestProvider.delete(requestId);
  }
}
