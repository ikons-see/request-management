package com.ikons.requestmanagement.core.usecase.user.exception;

public class MissingUserException extends RuntimeException {

  public MissingUserException(final long id) {
    super("user-not-found" + id);
  }

  public MissingUserException() {
    super("user-not-found");
  }
}
