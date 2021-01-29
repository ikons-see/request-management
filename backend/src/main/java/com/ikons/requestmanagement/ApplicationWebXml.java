package com.ikons.requestmanagement;

import com.ikons.config.ProfileUtil;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * This is a helper Java class that provides an alternative to creating a {@code web.xml}.
 * This will be invoked only when the application is deployed to a Servlet container like Tomcat, JBoss etc.
 */
public class ApplicationWebXml extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    // set a default to use when no profile is configured.
    ProfileUtil.addDefaultProfile(application.application());
    return application.sources(RequestManagementApplication.class);
  }
}
