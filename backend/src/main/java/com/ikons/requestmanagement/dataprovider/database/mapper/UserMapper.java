package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.UserDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.Authority;
import com.ikons.requestmanagement.dataprovider.database.entity.User;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
  public static List<UserDTO> usersToUserDTOs(List<User> users) {
    return users.stream()
        .filter(Objects::nonNull)
        .map(UserMapper::userToUserDTO)
        .collect(Collectors.toList());
  }

  public static UserDTO userToUserDTO(final User user, final Boolean excludeAuthorities) {
    Set<String> authorities = excludeAuthorities ? new HashSet<>() : stringsFromAuthorities(user.getAuthorities());

    return UserDTO.builder()
        .id(user.getId())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .login(user.getLogin())
        .email(user.getEmail())
        .activated(user.isActivated())
        .activationKey(user.getActivationKey())
        .langKey(user.getLangKey())
        .imageUrl(user.getImageUrl())
        .authorities(authorities)
        .createdBy(user.getCreatedBy())
        .createdDate(user.getCreatedDate())
        .lastModifiedBy(user.getLastModifiedBy())
        .lastModifiedDate(user.getLastModifiedDate())
        .build();
  }

  public static UserDTO userToUserDTO(final User user) {
    return userToUserDTO(user, false);
  }

  public static List<User> userDTOsToUsers(final List<UserDTO> userDTOs) {
    return userDTOs.stream()
        .filter(Objects::nonNull)
        .map(UserMapper::userDTOToUser)
        .collect(Collectors.toList());
  }

  public static User userDTOToUser(final UserDTO userDTO,  Boolean excludeAuthorities) {
    if (userDTO == null) {
      return null;
    } else {
      Set<Authority> authorities = excludeAuthorities ? null : authoritiesFromStrings(userDTO.getAuthorities());
      User user = new User();
      user.setId(userDTO.getId());
      user.setLogin(userDTO.getLogin());
      user.setFirstName(userDTO.getFirstName());
      user.setLastName(userDTO.getLastName());
      user.setEmail(userDTO.getEmail());
      user.setImageUrl(userDTO.getImageUrl());
      user.setActivated(userDTO.getActivated());
      user.setActivationKey(userDTO.getActivationKey());
      user.setLangKey(userDTO.getLangKey());
      user.setAuthorities(authorities);
      return user;
    }
  }

  public static User userDTOToUser(final UserDTO userDTO) {
    return userDTOToUser(userDTO, false);
  }

  private static Set<Authority> authoritiesFromStrings(final Set<String> authoritiesAsString) {
    Set<Authority> authorities = new HashSet<>();

    if (authoritiesAsString != null) {
      authorities = authoritiesAsString.stream().map(string -> {
        Authority auth = new Authority();
        auth.setName(string);
        return auth;
      }).collect(Collectors.toSet());
    }

    return authorities;
  }

  private static Set<String> stringsFromAuthorities(final Set<Authority> authorities) {
    if (authorities == null || authorities.isEmpty()) {
      return new HashSet<String>();
    }
    return authorities.stream()
        .map(Authority::getName)
        .collect(Collectors.toSet());
  }

  public static User userFromId(Long id) {
    if (id == null) {
      return null;
    }
    User user = new User();
    user.setId(id);
    return user;
  }
}
