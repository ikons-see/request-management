package com.ikons.requestmanagement.config;

import ch.qos.logback.classic.LoggerContext;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.config.IkonsConfiguration;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

import static com.ikons.config.logging.LoggingUtils.*;

@Configuration
public class LoggingConfiguration {
  public LoggingConfiguration(@Value("${spring.application.name}") String appName,
                              @Value("${server.port}") String serverPort,
                              IkonsConfiguration ikonsConfig,
                              ObjectMapper mapper) throws JsonProcessingException {

    LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();

    Map<String, String> map = new HashMap<>();
    map.put("app_name", appName);
    map.put("app_port", serverPort);
    String customFields = mapper.writeValueAsString(map);

    IkonsConfiguration.Logging loggingProperties = ikonsConfig.getLogging();
    IkonsConfiguration.Logging.Logstash logstashProperties = loggingProperties.getLogstash();

    if (loggingProperties.isUseJsonFormat()) {
      addJsonConsoleAppender(context, customFields);
    }
    if (logstashProperties.isEnabled()) {
      addLogstashTcpSocketAppender(context, customFields, logstashProperties);
    }
    if (loggingProperties.isUseJsonFormat() || logstashProperties.isEnabled()) {
      addContextListener(context, customFields, loggingProperties);
    }
  }
}
