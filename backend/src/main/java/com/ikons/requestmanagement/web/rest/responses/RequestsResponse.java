package com.ikons.requestmanagement.web.rest.responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestsResponse {
    private List<RequestDetails> requestResponses;
    private long total;
}
