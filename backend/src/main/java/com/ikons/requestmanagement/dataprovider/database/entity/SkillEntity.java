package com.ikons.requestmanagement.dataprovider.database.entity;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Table(name = "ik_skill")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillEntity {

  @NotNull
  @Id
  @Column
  private String skill;

}
