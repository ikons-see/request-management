package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Long>, JpaSpecificationExecutor<RequestEntity> {

    List<RequestEntity> findByCreatedBy(String username, Pageable pageable);

    long countByCreatedBy(String userId);
}
