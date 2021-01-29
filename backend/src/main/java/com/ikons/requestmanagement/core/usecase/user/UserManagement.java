package com.ikons.requestmanagement.core.usecase.user;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserManagement {
  public Optional<UserDTO> activateRegistration(String key);
  public Optional<UserDTO> completePasswordReset(String newPassword, String key);
  public Optional<UserDTO> requestPasswordReset(String mail);
  public UserDTO registerUser(UserDTO userDTO, String password);
  public UserDTO createUser(UserDTO userDTO);
  public Optional<UserDTO> updateUser(UserDTO userDTO);
  public void deleteUser(String login);
  public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl);
  public void changePassword(String currentClearTextPassword, String newPassword);
  Page<UserDTO> getAllManagedUsers(Pageable pageable);
  Optional<UserDTO> getUserWithAuthoritiesByLogin(String login);
  Optional<UserDTO> getUserWithAuthorities();
  List<String> getAuthorities();
}
