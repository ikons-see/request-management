package com.ikons.requestmanagement.core.usecase.authenticate;

import org.springframework.stereotype.Component;

@Component
public class AuthenticateUseCase {
  private final UserAuthentication userAuthentication;

  public AuthenticateUseCase(UserAuthentication userAuthentication) {
    this.userAuthentication = userAuthentication;
  }

  public String authenticate(final String username, final String password, final Boolean rememberMe) {
    return this.userAuthentication.getJWTToken(username, password, rememberMe);
  }
}
