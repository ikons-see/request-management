package com.ikons.requestmanagement.core.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestStateHistoryDTO {

    private String createdBy;
    private Date createdDate;
    private String operation;
    private String notes;
}
