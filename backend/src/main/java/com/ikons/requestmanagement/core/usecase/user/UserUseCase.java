package com.ikons.requestmanagement.core.usecase.user;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.usecase.user.exception.InvalidPasswordException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Log4j2
@RequiredArgsConstructor
public class UserUseCase {
  private final UserManagement userManagement;
  private final UserActionNotification userActionNotification;

  public UserDTO createUser(UserDTO userDTO) {
    log.debug("user use-case to save User : {}", userDTO);

    final UserDTO user = userManagement.createUser(userDTO);
    if (user != null && user.getId() != null ) {
      userActionNotification.sendCreationEmail(user);
    }
    return user;
  }

  public UserDTO registerUser(final UserDTO userDTO, final String password) {
    log.debug("user use-case to register: {} ", userDTO);
    if (!checkPasswordLength(password)) {
      throw new InvalidPasswordException();
    }
    final UserDTO user = userManagement.registerUser(userDTO, password);
    userActionNotification.sendActivationEmail(user);
    return user;
  }

  public UserDTO activate(final String key) {
    log.debug("Activating user for activation key {}", key);
    return userManagement.activateRegistration(key)
        .orElseThrow(() -> new RuntimeException("No user was found for this activation key"));
  }

  public Optional<UserDTO> updateUser(UserDTO userDTO) {
    Optional<UserDTO> user = userManagement.updateUser(userDTO);
    return user;
  }

  public void updateAuthenticatedUser(UserDTO userDTO) {
    userManagement.updateAuthenticatedUser(userDTO);
  }

  public UserDTO getUser(final String login) {
    return userManagement.getUserWithAuthoritiesByLogin(login)
        .orElseThrow(() -> new RuntimeException("User could not be found"));
  }

  public UserDTO getAuthenticatedUser() {
    return userManagement.getUserWithAuthorities()
        .orElseThrow(() -> new RuntimeException("User could not be found"));
  }

  public Page<UserDTO> getUsers(Pageable pageable) {
    return userManagement.getAllManagedUsers(pageable);
  }

  public void deleteUser(final String login) {
    userManagement.deleteUser(login);
  }

  public List<String> getAuthorities() {
    return userManagement.getAuthorities();
  }

  public void changePassword(final String currentPassword, final String newPassword) {
    if (!checkPasswordLength(newPassword)) {
      throw new InvalidPasswordException();
    }
    userManagement.changePassword(currentPassword, newPassword);
  }

  public void requestPasswordReset(final String email) {
    userManagement.requestPasswordReset(email).ifPresentOrElse(
        userDTO -> userActionNotification.sendPasswordResetMail(userDTO) ,
        () -> new RuntimeException("Can not reset password for non existing email: "+ email)
    );
  }

  public void completePasswordReset(final String newPassword, final String resetKey) {
    if (!checkPasswordLength(newPassword)) {
      throw new InvalidPasswordException();
    }
    userManagement.completePasswordReset(newPassword, resetKey)
        .orElseThrow(() -> new RuntimeException("No user found for the reset key: " + resetKey));
  }

  private static boolean checkPasswordLength(String password) {
    return !StringUtils.isEmpty(password) &&
        password.length() >= UserManagement.PASSWORD_MIN_LENGTH &&
        password.length() <= UserManagement.PASSWORD_MAX_LENGTH;
  }

}
