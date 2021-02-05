package com.ikons.requestmanagement.core.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestsDTO {
    private List<RequestDetailsDTO> requestResponses;
    private long total;
}
