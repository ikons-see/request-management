package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.dataprovider.database.entity.StateHistoryEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StateHistoryRepository extends CrudRepository<StateHistoryEntity, Long> {

    List<StateHistoryEntity> findByRequestId(long requestId);
}
