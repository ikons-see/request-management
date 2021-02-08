package com.ikons.requestmanagement.dataprovider.database.entity;

import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Table(name = "ik_request")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"resources"})
public class RequestEntity extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @Column
    private String areaOfInterest;

    @Column
    private String status;

    @Column(columnDefinition = "DATE")
    @CreationTimestamp
    private Instant requestDate;

    @Column(columnDefinition = "DATE")
    private Instant startDate;

    @Column(columnDefinition = "DATE")
    private Instant endDate;

    @Column
    private String projectDescription;

    @Column
    private String notes;

    @Column
    private String statusNotes;

    @OneToMany(targetEntity = ResourceEntity.class, mappedBy = "request", cascade = CascadeType.ALL)
    private List<ResourceEntity> resources;
}
