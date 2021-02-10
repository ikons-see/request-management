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

  public static UserDTO userToUserDTO(User user) {
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
        .authorities(stringsFromAuthorities(user.getAuthorities()))
        .createdBy(user.getCreatedBy())
        .createdDate(user.getCreatedDate())
        .lastModifiedBy(user.getLastModifiedBy())
        .lastModifiedDate(user.getLastModifiedDate())
        .build();
  }

  public static List<User> userDTOsToUsers(List<UserDTO> userDTOs) {
    return userDTOs.stream()
        .filter(Objects::nonNull)
        .map(UserMapper::userDTOToUser)
        .collect(Collectors.toList());
  }

  public static User userDTOToUser(UserDTO userDTO) {
    if (userDTO == null) {
      return null;
    } else {
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
      Set<Authority> authorities = authoritiesFromStrings(userDTO.getAuthorities());
      user.setAuthorities(authorities);
      return user;
    }
  }

  private static Set<Authority> authoritiesFromStrings(Set<String> authoritiesAsString) {
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

  private static Set<String> stringsFromAuthorities(Set<Authority> authorities) {
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
