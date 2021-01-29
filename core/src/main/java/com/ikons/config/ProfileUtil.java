package com.ikons.config;

import org.springframework.boot.SpringApplication;

import java.util.HashMap;
import java.util.Map;

public final class ProfileUtil {
  private static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";

  private ProfileUtil() {}

  public static void addDefaultProfile(SpringApplication application) {
    Map<String, Object> defProperties = new HashMap<>();
    /*
     * The default profile to use when no other profiles are defined
     * This cannot be set in the application.yml file.
     * See https://github.com/spring-projects/spring-boot/issues/1219
     */
    defProperties.put(SPRING_PROFILE_DEFAULT, IkonsConstants.SPRING_PROFILE_DEVELOPMENT);
    application.setDefaultProperties(defProperties);
  }
}
