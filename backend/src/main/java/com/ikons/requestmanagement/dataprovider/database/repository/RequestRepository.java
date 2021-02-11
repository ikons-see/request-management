package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.core.dto.MonthlyReportsDto;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Long>, JpaSpecificationExecutor<RequestEntity> {

  List<RequestEntity> findByCreatedBy(String username, Pageable pageable);

  long countByCreatedBy(String userId);

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM ik_request req WHERE req.status NOT LIKE :status ")
  long countAllActiveRequests(@Param("status") final String status);

  @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM ik_request req WHERE req.status LIKE :status ")
  long countAllOnGoingRequests(@Param("status") final String status);

  @Query("SELECT new com.ikons.requestmanagement.core.dto.MonthlyReportsDto(year(req.startDate), month(req.startDate), count(req.requestId) )"
      + " FROM RequestEntity req "
      + " GROUP BY year(startDate), month(startDate)")
  List<MonthlyReportsDto> totalRequestsPerMonth();

  @Query("SELECT new com.ikons.requestmanagement.core.dto.MonthlyReportsDto(year(req.startDate), month(req.startDate), sum(res.total) )"
      + " FROM RequestEntity req "
      + " LEFT JOIN req.resources res "
      + " GROUP BY year(req.startDate), month(req.startDate)")
  List<MonthlyReportsDto> totalResourcesPerMonth();
}
