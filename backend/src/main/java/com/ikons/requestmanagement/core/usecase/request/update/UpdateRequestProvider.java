package com.ikons.requestmanagement.core.usecase.request.update;


import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;

public interface UpdateRequestProvider {

  void update(final RequestUpdate requestUpdate);
}
