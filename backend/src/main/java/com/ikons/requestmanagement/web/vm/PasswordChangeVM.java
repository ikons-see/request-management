package com.ikons.requestmanagement.web.vm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeVM {
  private String currentPassword;
  private String newPassword;
}
