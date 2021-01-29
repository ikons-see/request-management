package com.ikons.requestmanagement.web.errors;

public class EmailAlreadyUsedAlertException extends BadRequestAlertException {

  private static final long serialVersionUID = 1L;

  public EmailAlreadyUsedAlertException() {
    super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Email is already in use!", "userManagement", "emailexists");
  }
}
