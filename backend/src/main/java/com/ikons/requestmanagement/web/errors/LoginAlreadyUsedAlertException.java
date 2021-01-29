package com.ikons.requestmanagement.web.errors;

public class LoginAlreadyUsedAlertException extends BadRequestAlertException {

  private static final long serialVersionUID = 1L;

  public LoginAlreadyUsedAlertException() {
    super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "Login name already used!", "userManagement", "userexists");
  }
}
