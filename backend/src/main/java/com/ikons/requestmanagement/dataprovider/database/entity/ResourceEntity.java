package com.ikons.requestmanagement.dataprovider.database.entity;

import com.ikons.requestmanagement.core.dto.SeniorityDTO;
import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "ik_resource")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resourceId;

    @Enumerated(EnumType.STRING)
    @Column
    private SeniorityDTO seniority;

    @Column
    private String notes;

    @Column
    private Integer total;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private RequestEntity request;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "ik_resource_skill", joinColumns = @JoinColumn(name = "resource_id"), inverseJoinColumns = @JoinColumn(name = "skill"))
    private Set<SkillEntity> skills;

}
