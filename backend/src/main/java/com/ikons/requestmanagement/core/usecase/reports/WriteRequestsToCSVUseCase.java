package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.RequestCsvDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class WriteRequestsToCSVUseCase {

  private final RequestDetailsManagement requestDetailsManagement;

  public WriteRequestsToCSVUseCase(RequestDetailsManagement requestDetailsManagement) {
    this.requestDetailsManagement = requestDetailsManagement;
  }

  public void writeDataToCsv(PrintWriter writer) throws Exception {

    final List<RequestDetailsDTO> allRequests = requestDetailsManagement.getAllRequests(Pageable.unpaged());

    final List<RequestCsvDTO> requestCsvDTOList = allRequests.stream().map(request -> {
      final RequestCsvDTO requestCsv = RequestCsvDTO.builder()
          .createdBy(request.getDisplayName())
          .projectDescription(request.getProjectDescription())
          .createdDate(Date.from(request.getCreatedDate()))
          .status(request.getStatus())
          .total(request.getResources().stream().mapToLong(resourceDTO -> resourceDTO.getTotal()).sum())
          .totalProvided(request.getResources().stream().mapToLong(resourceDTO -> resourceDTO.getTotalProvided()).sum())
          .build();
      return requestCsv;
    }).collect(Collectors.toList());

    if (!requestCsvDTOList.isEmpty() && requestCsvDTOList != null) {
      StatefulBeanToCsv<RequestCsvDTO> sbc = new StatefulBeanToCsvBuilder(writer).build();
      sbc.write(requestCsvDTOList);
      writer.close();

    }
  }
}
