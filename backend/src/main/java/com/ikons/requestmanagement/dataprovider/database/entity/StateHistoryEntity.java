package com.ikons.requestmanagement.dataprovider.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Table(name = "ik_state_history")
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StateHistoryEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedBy
    @Column(name = "created_by", nullable = false, length = 50, updatable = false)
    @JsonIgnore
    private String createdBy;

    @CreatedDate
    @Column(columnDefinition = "DATE")
    private Instant createdDate;

    @Column
    private long requestId;

    @Column
    private String operation;

    @Column
    private String notes;

    @PrePersist
    public void prePersist() {
        createdDate = Instant.now();
    }
}
