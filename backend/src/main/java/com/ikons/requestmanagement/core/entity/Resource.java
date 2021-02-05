package com.ikons.requestmanagement.core.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Resource {

    private long resourceId;
    private int total;
    private String seniority;
    private List<String> skills;
    private String notes;
}
