package com.ikons.requestmanagement.core.usecase.user;

import com.ikons.requestmanagement.core.dto.UserDTO;

public interface UserActionNotification {
  void sendActivationEmail(UserDTO user);
  void sendCreationEmail(UserDTO user);
  void sendPasswordResetMail(UserDTO user);
}
