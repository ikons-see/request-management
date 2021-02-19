package com.ikons.requestmanagement.dataprovider.database.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NotFound;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Table(name = "ik_area_of_interest")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AreaOfInterestEntity {

  @NotNull
  @Id
  @Column
  private String areaOfInterest;

}
