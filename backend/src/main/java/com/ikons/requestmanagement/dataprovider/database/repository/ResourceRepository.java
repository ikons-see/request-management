package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends CrudRepository<ResourceEntity, Long> {

  void deleteByResourceIdIn(final List<Long> resourceIds);

}
