package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.usecase.authenticate.AuthenticateUseCase;
import com.ikons.security.jwt.JWTFilter;
import com.ikons.requestmanagement.web.vm.LoginVM;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
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
