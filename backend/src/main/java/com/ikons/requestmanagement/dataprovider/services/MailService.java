package com.ikons.requestmanagement.dataprovider.services;

import com.ikons.config.IkonsConfiguration;
import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.usecase.user.UserActionNotification;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@Log4j2
public class MailService implements UserActionNotification {
  private static final String USER = "user";
  private static final String BASE_URL = "baseUrl";

  private final IkonsConfiguration ikonsConfiguration;
  private final JavaMailSender javaMailSender;
  private final MessageSource messageSource;
  private final SpringTemplateEngine templateEngine;

  public MailService(
      IkonsConfiguration ikonsConfiguration,
      JavaMailSender javaMailSender,
      MessageSource messageSource,
      SpringTemplateEngine templateEngine
  ) {
    this.ikonsConfiguration = ikonsConfiguration;
    this.javaMailSender = javaMailSender;
    this.messageSource = messageSource;
    this.templateEngine = templateEngine;
  }

  @Async
  public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
    log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
        isMultipart, isHtml, to, subject, content);

    // Prepare message using a Spring helper
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
      message.setTo(to);
      message.setFrom(ikonsConfiguration.getMail().getFrom());
      message.setSubject(subject);
      message.setText(content, isHtml);
      javaMailSender.send(mimeMessage);
      log.debug("Sent email to User '{}'", to);
    }  catch (MailException | MessagingException e) {
      log.warn("Email could not be sent to user '{}'", to, e);
    }
  }

  @Async
  public void sendEmailFromTemplate(UserDTO user, String templateName, String titleKey) {
    if (user.getEmail() == null) {
      log.debug("Email doesn't exist for user '{}'", user.getLogin());
      return;
    }
    Locale locale = Locale.forLanguageTag(user.getLangKey());
    Context context = new Context(locale);
    context.setVariable(USER, user);
    context.setVariable(BASE_URL, ikonsConfiguration.getMail().getBaseUrl());
    String content = templateEngine.process(templateName, context);
    String subject = messageSource.getMessage(titleKey, null, locale);
    sendEmail(user.getEmail(), subject, content, false, true);
  }

  @Override
  @Async
  public void sendActivationEmail(UserDTO user) {
    log.debug("Sending activation email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
  }

  @Override
  @Async
  public void sendCreationEmail(UserDTO user) {
    log.debug("Sending creation email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
  }

  @Override
  @Async
  public void sendPasswordResetMail(UserDTO user) {
    log.debug("Sending password reset email to '{}'", user.getEmail());
    sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
  }
}
