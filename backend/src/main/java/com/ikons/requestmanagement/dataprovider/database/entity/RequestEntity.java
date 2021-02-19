package com.ikons.requestmanagement.dataprovider.database.entity;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
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
    private String status;

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

    @OneToMany(targetEntity = ResourceEntity.class, mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResourceEntity> resources;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_of_interest")
    private AreaOfInterestEntity areaOfInterest;
}
