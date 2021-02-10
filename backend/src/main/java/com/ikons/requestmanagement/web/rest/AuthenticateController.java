package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.usecase.authenticate.AuthenticateUseCase;
import com.ikons.security.jwt.JWTFilter;
import com.ikons.requestmanagement.web.vm.LoginVM;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Log4j2
public class AuthenticateController {
  private final AuthenticateUseCase authenticateUseCase;

  public AuthenticateController(
      AuthenticateUseCase authenticateUseCase
  ) {
    this.authenticateUseCase = authenticateUseCase;
  }

  @PostMapping("/authenticate")
  public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {
    String jwt = this.authenticateUseCase.authenticate(
        loginVM.getUsername(),
        loginVM.getPassword(),
        loginVM.getRememberMe()
    );
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
    return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
  }

  /**
   * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
   *
   * @param request the HTTP request.
   * @return the login if the user is authenticated.
   */
  @GetMapping("/authenticate")
  public String isAuthenticated(HttpServletRequest request) {
    log.debug("REST request to check if the current user is authenticated");
    return request.getRemoteUser();
  }

  /**
   * Object to return as body in JWT Authentication.
   */
  static class JWTToken {

    private String idToken;

    JWTToken(String idToken) {
      this.idToken = idToken;
    }

    @JsonProperty("id_token")
    String getIdToken() {
      return idToken;
    }

    void setIdToken(String idToken) {
      this.idToken = idToken;
    }
  }
}
