package com.ikons.requestmanagement.core.usecase.user;

import com.ikons.requestmanagement.core.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

  public Optional<UserDTO> updateUser(UserDTO userDTO) {
    Optional<UserDTO> user = userManagement.updateUser(userDTO);
    return user;
  }

  public Optional<UserDTO> getUser(final String login) {
    return userManagement.getUserWithAuthoritiesByLogin(login);
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
}
