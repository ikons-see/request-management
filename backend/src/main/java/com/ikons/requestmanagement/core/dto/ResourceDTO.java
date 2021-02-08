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
public class ResourceDTO {

    private long resourceId;
    private int total;
    private String seniority;
    private List<String> skills;
    private String notes;
}
