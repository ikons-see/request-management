package com.ikons.requestmanagement.core.dto;

import java.util.List;
import java.util.Set;

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
    private int totalProvided;
    private String seniority;
    private Set<String> skills;
    private String note;
}
