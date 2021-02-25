package com.ikons.requestmanagement.core.usecase.reports;

import com.ikons.requestmanagement.core.dto.RequestCsvDTO;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class WriteDataToCSVUseCase {

  private final ReportResults reportResults;

  public WriteDataToCSVUseCase(ReportResults reportResults) {
    this.reportResults = reportResults;
  }

  public void writeDataToCsv(PrintWriter writer) throws Exception {

    final List<RequestCsvDTO> requestCsvDTOList = reportResults.requestsCsv();

    if (!requestCsvDTOList.isEmpty() && requestCsvDTOList != null) {
      StatefulBeanToCsv<RequestCsvDTO> sbc = new StatefulBeanToCsvBuilder(writer).build();
      sbc.write(requestCsvDTOList);
      writer.close();

    }
  }
}
