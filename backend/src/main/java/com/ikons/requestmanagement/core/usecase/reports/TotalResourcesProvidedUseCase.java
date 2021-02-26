package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.RequestCsvDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.core.dto.TotalResourcesProvidedDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalResourcesProvidedUseCase {

  private final RequestDetailsManagement requestDetailsManagement;

  public TotalResourcesProvidedUseCase(RequestDetailsManagement requestDetailsManagement) {
    this.requestDetailsManagement = requestDetailsManagement;
  }

  public TotalResourcesProvidedDTO totalResourcesProvided(){
    final List<RequestDetailsDTO> allRequests = requestDetailsManagement.getAllActiveRequests();
    final List<ResourceDTO> resourcesTotals = allRequests.stream().map(request -> {
      final ResourceDTO resourceDTO = ResourceDTO.builder()
          .total(Math.toIntExact(request.getResources().stream().mapToLong(resource -> resource.getTotal()).sum()))
          .totalProvided(Math.toIntExact(request.getResources().stream().mapToLong(resource -> resource.getTotalProvided()).sum()))
          .build();
      return resourceDTO;
    }).collect(Collectors.toList());


    return TotalResourcesProvidedDTO.builder()
        .totalRequiredResources(resourcesTotals.stream().mapToLong(resourceRequested -> resourceRequested.getTotal()).sum())
        .totalProvidedResources(resourcesTotals.stream().mapToLong(resourceProvided -> resourceProvided.getTotalProvided()).sum())
        .build();
  }
}
