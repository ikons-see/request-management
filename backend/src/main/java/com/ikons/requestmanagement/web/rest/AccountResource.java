package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.usecase.user.UserUseCase;
import com.ikons.requestmanagement.dataprovider.database.mapper.UserMapper;
import com.ikons.requestmanagement.dataprovider.database.repository.UserRepository;
import com.ikons.requestmanagement.security.SecurityUtils;
import com.ikons.requestmanagement.web.vm.ManagedUserVM;
import com.ikons.requestmanagement.web.vm.PasswordChangeVM;
import com.ikons.requestmanagement.web.vm.ResetPasswordVM;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
public class AccountResource {

  private final UserUseCase userUseCase;

  @Value("${spring.application.name}")
  private String applicationName;

  public AccountResource(UserUseCase userUseCase) {
    this.userUseCase = userUseCase;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
    this.userUseCase.registerUser(managedUserVM, managedUserVM.getPassword());
  }

  /**
   * {@code GET /activate} : activate the registered user.
   */
  @GetMapping("/activate")
  public void activateAccount(@RequestParam(value = "key") String key) {
    userUseCase.activate(key);
  }

  /**
   * {@code GET  /account} : get the current user.
   */
  @GetMapping("/account")
  public UserDTO getAccount() {
    return userUseCase.getAuthenticatedUser();
  }

  /**
   * {@code POST  /account} : update the current user information.
   */
  @PostMapping("/account")
  public void saveAccount(@Valid @RequestBody UserDTO userDTO){
    userUseCase.updateAuthenticatedUser(userDTO);
  }

  /**
   * {@code POST  /account/change-password} : changes the current user's password.
   */
  @PostMapping(path = "/account/change-password")
  public void changePassword(@RequestBody PasswordChangeVM passwordChange) {
    userUseCase.changePassword(passwordChange.getCurrentPassword(), passwordChange.getNewPassword());
  }

  /**
   * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
   *
   * @param email the mail of the user.
   */
  @PostMapping(path = "/account/reset-password/init")
  public void requestPasswordReset(@RequestBody String email) {
    userUseCase.requestPasswordReset(email);
  }

  /**
   * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
   *
   * @param resetPasswordVM the generated key and the new password.
   */
  @PostMapping(path = "/account/reset-password/finish")
  public void finishPasswordReset(@RequestBody ResetPasswordVM resetPasswordVM) {
    userUseCase.completePasswordReset(resetPasswordVM.getNewPassword(), resetPasswordVM.getResetKey());
  }

}
