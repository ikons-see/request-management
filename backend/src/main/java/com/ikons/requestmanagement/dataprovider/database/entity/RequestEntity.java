package com.ikons.requestmanagement.dataprovider.database.entity;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "ik_request")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private Date requestDate;

    @Column(columnDefinition = "DATE")
    private Date startDate;

    @Column(columnDefinition = "DATE")
    private Date endDate;

    @Column
    private String projectDescription;

    @Column
    private String notes;

    @OneToMany(targetEntity = ResourceEntity.class, mappedBy = "request", cascade = CascadeType.REMOVE)
    private List<ResourceEntity> resources;
}
