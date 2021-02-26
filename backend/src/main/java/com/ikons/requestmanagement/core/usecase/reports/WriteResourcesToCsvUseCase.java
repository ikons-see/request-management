package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.RequestCsvDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.ResourcesCsvDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WriteResourcesToCsvUseCase {

  private final RequestDetailsManagement requestDetailsManagement;

  public WriteResourcesToCsvUseCase(RequestDetailsManagement requestDetailsManagement) {
    this.requestDetailsManagement = requestDetailsManagement;
  }

  public void writeResourcesToCsv(PrintWriter writer) throws Exception {

    final List<RequestDetailsDTO> allRequests = requestDetailsManagement.getAllActiveRequests();

    List<ResourcesCsvDTO> allResources = new ArrayList<>();
    for (RequestDetailsDTO requestDetailsDTO : allRequests){
      final List<ResourcesCsvDTO> requestResources = requestDetailsDTO.getResources().stream().map(resource -> {
        final ResourcesCsvDTO resourceCsv = ResourcesCsvDTO.builder()
            .projectDescription(requestDetailsDTO.getProjectDescription())
            .seniority(resource.getSeniority())
            .skills(String.join(", ", resource.getSkills()))
            .total(resource.getTotal())
            .totalProvided(resource.getTotalProvided())
            .build();
        return resourceCsv;
      }).collect(Collectors.toList());
      allResources.addAll(requestResources);
    }

    if (!allResources.isEmpty() && allResources != null) {
      StatefulBeanToCsv<ResourcesCsvDTO> sbc = new StatefulBeanToCsvBuilder(writer).build();
      sbc.write(allResources);
      writer.close();
    }
  }
}
