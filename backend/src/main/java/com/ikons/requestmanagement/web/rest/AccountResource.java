package com.ikons.requestmanagement.web.rest;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.dataprovider.database.mapper.UserMapper;
import com.ikons.requestmanagement.dataprovider.database.repository.UserRepository;
import com.ikons.requestmanagement.security.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
public class AccountResource {

  private final UserRepository userRepository;

  public AccountResource(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/")
  public ResponseEntity<UserDTO> getAccountInfo() {
    Optional<UserDTO> account = SecurityUtils.getCurrentUserLogin().map(
        login -> userRepository.findOneWithAuthoritiesByLogin(login)
            .filter(user -> !Objects.isNull(user))
            .map(user -> UserMapper.userToUserDTO(user))
        .get()
    );
    return ResponseEntity.of(account);
  }
}
