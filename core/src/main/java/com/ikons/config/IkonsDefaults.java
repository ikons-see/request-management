package com.ikons.config;

public class IkonsDefaults {
  interface Async {
    int corePoolSize = 2;
    int maxPoolSize = 50;
    int queueCapacity = 10000;
  }

  interface Http {
    interface Cache {
      int timeToLiveInDays = 1461; // 4 years (including leap day)
    }
  }

  interface Cache {
    interface Caffeine {
      int timeToLiveSeconds = 3600; // 1 hour
      long maxEntries = 100;
    }

    interface Ehcache {
      int timeToLiveSeconds = 3600; // 1 hour
      long maxEntries = 100;
    }
  }

  interface Mail {
    boolean enabled = false;
    String from = "";
    String baseUrl = "";
  }

  interface Security {
    interface Authentication {

      interface Jwt {
        String secret = null;
        String base64Secret = null;
        long tokenValidityInSeconds = 1800; // 30 minutes
        long tokenValidityInSecondsForRememberMe = 2592000; // 30 days
      }
    }

    interface RememberMe {
      String key = null;
    }
  }

  interface ApiDocs {

    String title = "Application API";
    String description = "API documentation";
    String version = "0.0.1";
    String termsOfServiceUrl = null;
    String contactName = null;
    String contactUrl = null;
    String contactEmail = null;
    String license = null;
    String licenseUrl = null;
    String defaultIncludePattern = "/api/.*";
    String host = null;
    String[] protocols = {};
    boolean useDefaultResponseMessages = true;
  }

  interface Logging {

    boolean useJsonFormat = false;

    interface Logstash {

      boolean enabled = false;
      String host = "localhost";
      int port = 5000;
      int queueSize = 512;
    }
  }

  interface Ribbon {

    String[] displayOnActiveProfiles = null;
  }
}
