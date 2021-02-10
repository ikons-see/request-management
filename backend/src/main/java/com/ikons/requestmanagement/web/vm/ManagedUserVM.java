package com.ikons.requestmanagement.web.vm;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@ToString(callSuper = true, exclude = "password")
@NoArgsConstructor
public class ManagedUserVM extends UserDTO {

  @Size(min = UserManagement.PASSWORD_MIN_LENGTH, max = UserManagement.PASSWORD_MAX_LENGTH)
  private String password;

}
