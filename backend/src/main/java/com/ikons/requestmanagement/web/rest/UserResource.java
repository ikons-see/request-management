package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.core.usecase.user.UserUseCase;
import com.ikons.requestmanagement.core.usecase.user.exception.EmailAlreadyUsedException;
import com.ikons.requestmanagement.core.usecase.user.exception.UsernameAlreadyUsedException;
import com.ikons.requestmanagement.web.errors.BadRequestAlertException;
import com.ikons.requestmanagement.web.errors.EmailAlreadyUsedAlertException;
import com.ikons.requestmanagement.web.errors.LoginAlreadyUsedAlertException;
import com.ikons.requestmanagement.security.AuthoritiesConstants;
import com.ikons.web.util.HeaderUtil;
import com.ikons.web.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserResource {
  private final UserUseCase userUseCase;

  @Value("${spring.application.name}")
  private String applicationName;

  public UserResource(UserUseCase userUseCase) {
    this.userUseCase = userUseCase;
  }

  /**
   * {@code POST  /users}  : Creates a new user.
   * <p>
   * Creates a new user if the login and email are not already used, and sends an
   * mail with an activation link.
   * The user needs to be activated on creation.
   *
   * @param userDTO the user to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new user, or with status {@code 400 (Bad Request)} if the login or email is already in use.
   * @throws URISyntaxException                                                  if the Location URI syntax is incorrect.
   * @throws BadRequestAlertException {@code 400 (Bad Request)} if the login or email is already in use.
   */
  @PostMapping("/users")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
    if (userDTO.getId() != null) {
      throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
    }
    try {
      UserDTO user = this.userUseCase.createUser(userDTO);
      HttpHeaders headers = HeaderUtil.createAlert("", "userManagement.created", user.getLogin());
      return ResponseEntity
          .created(new URI("/api/users/" + user.getLogin()))
          .headers(headers)
          .body(user);
    } catch (UsernameAlreadyUsedException e) {
      throw new LoginAlreadyUsedAlertException();
    } catch (EmailAlreadyUsedException e) {
      throw new EmailAlreadyUsedAlertException();
    }

  }

  @PutMapping("/users")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDTO) {
    Optional<UserDTO> updatedUser = userUseCase.updateUser(userDTO);
    HttpHeaders headers = HeaderUtil.createAlert(applicationName, "userManagement.updated", userDTO.getLogin());
    return updatedUser.map(
        response -> ResponseEntity.ok()
            .headers(headers)
            .body(response)
    ).orElseGet(ResponseEntity.notFound()::build);
  }

  @GetMapping("/users")
  public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
    final Page<UserDTO> page = userUseCase.getUsers(pageable);
    HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
    return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
  }
}
