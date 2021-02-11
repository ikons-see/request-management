package com.ikons.requestmanagement.web.vm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordVM {
  private String resetKey;
  private String newPassword;
}
