package com.ikons.requestmanagement.web.rest.requests;

import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeStatusRequest {
    private long requestId;
    private RequestStatusDTO requestStatus;
    private String note;
}
