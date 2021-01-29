package com.ikons.requestmanagement.core.usecase.authenticate;

public interface UserAuthentication {
  String getJWTToken(final String username, final String password, final Boolean rememberMe);
}
