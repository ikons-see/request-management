package com.ikons.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.web.cors.CorsConfiguration;

import javax.validation.constraints.NotNull;

@ConfigurationProperties(prefix = "ikons", ignoreUnknownFields = false)
@PropertySources({
    @PropertySource(value = "classpath:git.properties", ignoreResourceNotFound = true),
    @PropertySource(value = "classpath:META-INF/build-info.properties", ignoreResourceNotFound = true)
})
public class IkonsConfiguration {
  private final Async async = new Async();
  private final Http http = new Http();
  private final Cache cache = new Cache();
  private final Mail mail = new Mail();
  private final Security security = new Security();
  private final ApiDocs apiDocs = new ApiDocs();
  private final Logging logging = new Logging();
  private final CorsConfiguration cors = new CorsConfiguration();

  public Async getAsync() {
    return async;
  }

  public Http getHttp() {
    return http;
  }

  public Cache getCache() {
    return cache;
  }

  public Mail getMail() {
    return mail;
  }

  public Security getSecurity() {
    return security;
  }

  public ApiDocs getApiDocs() {
    return apiDocs;
  }

  public Logging getLogging() {
    return logging;
  }

  public CorsConfiguration getCors() {
    return cors;
  }

  public static class Async {
    private int corePoolSize = IkonsDefaults.Async.corePoolSize;
    private int maxPoolSize = IkonsDefaults.Async.maxPoolSize;
    private int queueCapacity = IkonsDefaults.Async.queueCapacity;

    public int getCorePoolSize() {
      return corePoolSize;
    }

    public void setCorePoolSize(int corePoolSize) {
      this.corePoolSize = corePoolSize;
    }

    public int getMaxPoolSize() {
      return maxPoolSize;
    }

    public void setMaxPoolSize(int maxPoolSize) {
      this.maxPoolSize = maxPoolSize;
    }

    public int getQueueCapacity() {
      return queueCapacity;
    }

    public void setQueueCapacity(int queueCapacity) {
      this.queueCapacity = queueCapacity;
    }
  }

  public static class Http {
    private final Cache cache = new Cache();

    public Cache getCache() {
      return cache;
    }

    public static class Cache {
      private int timeToLiveInDays = IkonsDefaults.Http.Cache.timeToLiveInDays;

      public int getTimeToLiveInDays() {
        return timeToLiveInDays;
      }

      public void setTimeToLiveInDays(int timeToLiveInDays) {
        this.timeToLiveInDays = timeToLiveInDays;
      }
    }
  }

  public static class Cache {
    private final Caffeine caffeine = new Caffeine();
    private final Ehcache ehcache = new Ehcache();

    public Caffeine getCaffeine() {
      return caffeine;
    }

    public Ehcache getEhcache() {
      return ehcache;
    }

    public static class Caffeine {
      private int timeToLiveSeconds = IkonsDefaults.Cache.Caffeine.timeToLiveSeconds;
      private long maxEntries = IkonsDefaults.Cache.Caffeine.maxEntries;

      public int getTimeToLiveSeconds() {
        return timeToLiveSeconds;
      }

      public void setTimeToLiveSeconds(int timeToLiveSeconds) {
        this.timeToLiveSeconds = timeToLiveSeconds;
      }

      public long getMaxEntries() {
        return maxEntries;
      }

      public void setMaxEntries(long maxEntries) {
        this.maxEntries = maxEntries;
      }
    }

    public static class Ehcache {
      private int timeToLiveSeconds = IkonsDefaults.Cache.Ehcache.timeToLiveSeconds;
      private long maxEntries = IkonsDefaults.Cache.Ehcache.maxEntries;

      public int getTimeToLiveSeconds() {
        return timeToLiveSeconds;
      }

      public void setTimeToLiveSeconds(int timeToLiveSeconds) {
        this.timeToLiveSeconds = timeToLiveSeconds;
      }

      public long getMaxEntries() {
        return maxEntries;
      }

      public void setMaxEntries(long maxEntries) {
        this.maxEntries = maxEntries;
      }
    }

  }

  public static class Mail {
    private boolean enabled = IkonsDefaults.Mail.enabled;
    private String from = IkonsDefaults.Mail.from;
    private String baseUrl = IkonsDefaults.Mail.baseUrl;

    public boolean isEnabled() {
      return enabled;
    }

    public void setEnabled(boolean enabled) {
      this.enabled = enabled;
    }

    public String getFrom() {
      return from;
    }

    public void setFrom(String from) {
      this.from = from;
    }

    public String getBaseUrl() {
      return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  public static class Security {
    private final Authentication authentication = new Authentication();
    private final RememberMe rememberMe = new RememberMe();

    public Authentication getAuthentication() {
      return authentication;
    }

    public RememberMe getRememberMe() {
      return rememberMe;
    }

    public static class Authentication {
      private final Jwt jwt = new Jwt();

      public Jwt getJwt() {
        return jwt;
      }

      public static class Jwt {

        private String secret = IkonsDefaults.Security.Authentication.Jwt.secret;

        private String base64Secret = IkonsDefaults.Security.Authentication.Jwt.base64Secret;

        private long tokenValidityInSeconds = IkonsDefaults.Security.Authentication.Jwt
            .tokenValidityInSeconds;

        private long tokenValidityInSecondsForRememberMe = IkonsDefaults.Security.Authentication.Jwt
            .tokenValidityInSecondsForRememberMe;

        public String getSecret() {
          return secret;
        }

        public void setSecret(String secret) {
          this.secret = secret;
        }

        public String getBase64Secret() {
          return base64Secret;
        }

        public void setBase64Secret(String base64Secret) {
          this.base64Secret = base64Secret;
        }

        public long getTokenValidityInSeconds() {
          return tokenValidityInSeconds;
        }

        public void setTokenValidityInSeconds(long tokenValidityInSeconds) {
          this.tokenValidityInSeconds = tokenValidityInSeconds;
        }

        public long getTokenValidityInSecondsForRememberMe() {
          return tokenValidityInSecondsForRememberMe;
        }

        public void setTokenValidityInSecondsForRememberMe(long tokenValidityInSecondsForRememberMe) {
          this.tokenValidityInSecondsForRememberMe = tokenValidityInSecondsForRememberMe;
        }
      }
    }

    public static class RememberMe {

      @NotNull
      private String key = IkonsDefaults.Security.RememberMe.key;

      public String getKey() {
        return key;
      }

      public void setKey(String key) {
        this.key = key;
      }
    }
  }

  public static class ApiDocs {
    private String title = IkonsDefaults.ApiDocs.title;
    private String description = IkonsDefaults.ApiDocs.description;
    private String version = IkonsDefaults.ApiDocs.version;
    private String termsOfServiceUrl = IkonsDefaults.ApiDocs.termsOfServiceUrl;
    private String contactName = IkonsDefaults.ApiDocs.contactName;
    private String contactUrl = IkonsDefaults.ApiDocs.contactUrl;
    private String contactEmail = IkonsDefaults.ApiDocs.contactEmail;
    private String license = IkonsDefaults.ApiDocs.license;
    private String licenseUrl = IkonsDefaults.ApiDocs.licenseUrl;
    private String defaultIncludePattern = IkonsDefaults.ApiDocs.defaultIncludePattern;
    private String host = IkonsDefaults.ApiDocs.host;
    private String[] protocols = IkonsDefaults.ApiDocs.protocols;
    private Server[] servers = {};
    private boolean useDefaultResponseMessages = IkonsDefaults.ApiDocs.useDefaultResponseMessages;

    public String getTitle() {
      return title;
    }

    public void setTitle(String title) {
      this.title = title;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }

    public String getVersion() {
      return version;
    }

    public void setVersion(String version) {
      this.version = version;
    }

    public String getTermsOfServiceUrl() {
      return termsOfServiceUrl;
    }

    public void setTermsOfServiceUrl(String termsOfServiceUrl) {
      this.termsOfServiceUrl = termsOfServiceUrl;
    }

    public String getContactName() {
      return contactName;
    }

    public void setContactName(String contactName) {
      this.contactName = contactName;
    }

    public String getContactUrl() {
      return contactUrl;
    }

    public void setContactUrl(String contactUrl) {
      this.contactUrl = contactUrl;
    }

    public String getContactEmail() {
      return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
      this.contactEmail = contactEmail;
    }

    public String getLicense() {
      return license;
    }

    public void setLicense(String license) {
      this.license = license;
    }

    public String getLicenseUrl() {
      return licenseUrl;
    }

    public void setLicenseUrl(String licenseUrl) {
      this.licenseUrl = licenseUrl;
    }

    public String getDefaultIncludePattern() {
      return defaultIncludePattern;
    }

    public void setDefaultIncludePattern(String defaultIncludePattern) {
      this.defaultIncludePattern = defaultIncludePattern;
    }

    public String getHost() {
      return host;
    }

    public void setHost(final String host) {
      this.host = host;
    }

    public String[] getProtocols() {
      return protocols;
    }

    public void setProtocols(final String[] protocols) {
      this.protocols = protocols;
    }

    public Server[] getServers() {
      return servers;
    }

    public void setServers(final Server[] servers) {
      this.servers = servers;
    }

    public boolean isUseDefaultResponseMessages() {
      return useDefaultResponseMessages;
    }

    public void setUseDefaultResponseMessages(final boolean useDefaultResponseMessages) {
      this.useDefaultResponseMessages = useDefaultResponseMessages;
    }

    public static class Server {
      private String name;
      private String url;
      private String description;

      public String getName() {
        return name;
      }

      public void setName(String name) {
        this.name = name;
      }

      public String getUrl() {
        return url;
      }

      public void setUrl(String url) {
        this.url = url;
      }

      public String getDescription() {
        return description;
      }

      public void setDescription(String description) {
        this.description = description;
      }
    }
  }

  public static class Logging {

    private boolean useJsonFormat = IkonsDefaults.Logging.useJsonFormat;

    private final Logstash logstash = new Logstash();

    public boolean isUseJsonFormat() {
      return useJsonFormat;
    }

    public void setUseJsonFormat(boolean useJsonFormat) {
      this.useJsonFormat = useJsonFormat;
    }

    public Logstash getLogstash() {
      return logstash;
    }

    public static class Logstash {

      private boolean enabled = IkonsDefaults.Logging.Logstash.enabled;

      private String host = IkonsDefaults.Logging.Logstash.host;

      private int port = IkonsDefaults.Logging.Logstash.port;

      private int queueSize = IkonsDefaults.Logging.Logstash.queueSize;

      public boolean isEnabled() {
        return enabled;
      }

      public void setEnabled(boolean enabled) {
        this.enabled = enabled;
      }

      public String getHost() {
        return host;
      }

      public void setHost(String host) {
        this.host = host;
      }

      public int getPort() {
        return port;
      }

      public void setPort(int port) {
        this.port = port;
      }

      public int getQueueSize() {
        return queueSize;
      }

      public void setQueueSize(int queueSize) {
        this.queueSize = queueSize;
      }
    }
  }


}
