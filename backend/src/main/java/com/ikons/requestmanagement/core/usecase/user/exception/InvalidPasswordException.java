package com.ikons.requestmanagement.core.usecase.user.exception;

public class InvalidPasswordException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public InvalidPasswordException() {
    super("Incorrect password");
  }
}
