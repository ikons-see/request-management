package com.ikons.requestmanagement.core.usecase.request.closerequest;

import com.ikons.requestmanagement.web.rest.requests.StatusNote;

public interface CloseRequest {

  void close(final Long requestId, final StatusNote statusNote);
}
