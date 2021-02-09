package com.ikons.requestmanagement.core.dto;

import com.ikons.requestmanagement.core.dto.ResourceDTO;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RequestDetailsDTO {
    private long requestId;
    private AreaOfInterestDTO areaOfInterest;
    private String displayName;
    private String status;
    private Instant startDate;
    private Instant endDate;
    private String notes;
    private String statusNotes;
    private String projectDescription;
    private List<ResourceDTO> resources;
}
