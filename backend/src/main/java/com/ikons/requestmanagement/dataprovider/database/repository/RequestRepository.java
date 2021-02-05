package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends CrudRepository<RequestEntity, Long> {

    List<RequestEntity> findByCreatedBy(String userId, Pageable pageable);

    List<RequestEntity> findAll(Pageable pageable);

    long countByCreatedBy(String userId);
}
