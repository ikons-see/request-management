package com.ikons.requestmanagement.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {
  public static final String ADMIN = "ROLE_ADMIN";

  public static final String REQUESTER = "ROLE_REQUESTER";

  public static final String ANONYMOUS = "ROLE_ANONYMOUS";

  private AuthoritiesConstants() {
  }
}
