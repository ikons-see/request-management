package com.ikons.requestmanagement.web.rest.requests;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Deprecated(since = "use its associated RequestDetailsDTO in core")
public class RequestData {
    private AreaOfInterestDTO areaOfInterest;
    private Instant startDate;
    private Instant endDate;
    private String projectDescription;
    private String otherNotes;
    private List<ResourceDTO> resources;
}
