package com.ikons.requestmanagement.dataprovider.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ikons.requestmanagement.config.Constants;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ik_user")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends AbstractAuditingEntity {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Pattern(regexp = Constants.LOGIN_REGEX)
  @Size(min = 1, max = 50)
  @Column(length = 50, unique = true, nullable = false)
  private String login;

  @JsonIgnore
  @NotNull
  @Size(min = 60, max = 60)
  @Column(name = "password_hash", length = 60, nullable = false)
  private String password;

  @Size(max = 50)
  @Column(name = "first_name", length = 50)
  private String firstName;

  @Size(max = 50)
  @Column(name = "last_name", length = 50)
  private String lastName;

  @Email
  @Size(min = 5, max = 254)
  @Column(length = 254, unique = true)
  private String email;

  @NotNull
  @Column(nullable = false)
  @Builder.Default
  private boolean activated = false;

  @Size(min = 2, max = 10)
  @Column(name = "lang_key", length = 10)
  private String langKey;

  @Size(max = 256)
  @Column(name = "image_url", length = 256)
  private String imageUrl;

  @Size(max = 20)
  @Column(name = "activation_key", length = 20)
  @JsonIgnore
  private String activationKey;

  @Size(max = 20)
  @Column(name = "reset_key", length = 20)
  @JsonIgnore
  private String resetKey;

  @Column(name = "reset_date")
  private Instant resetDate;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
      name = "ik_user_authority",
      joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
      inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
  @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
  @BatchSize(size = 20)
  @Builder.Default
  private Set<Authority> authorities = new HashSet<>();

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof User)) {
      return false;
    }
    return id != null && id.equals(((User) o).id);
  }

  @Override
  public int hashCode() {
    return 31;
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "User{" +
        "login='" + login + '\'' +
        ", firstName='" + firstName + '\'' +
        ", lastName='" + lastName + '\'' +
        ", email='" + email + '\'' +
        ", imageUrl='" + imageUrl + '\'' +
        ", activated='" + activated + '\'' +
        ", langKey='" + langKey + '\'' +
        ", activationKey='" + activationKey + '\'' +
        "}";
  }
}
