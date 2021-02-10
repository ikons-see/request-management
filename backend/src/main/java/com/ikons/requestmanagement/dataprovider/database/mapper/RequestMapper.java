package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ResourceMapper.class)
public interface RequestMapper extends EntityMapper<RequestEntity, RequestDetailsDTO> {

  @Mapping(source = "createdBy", target = "displayName")
  RequestDetailsDTO toDto(RequestEntity entity);

  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "lastModifiedBy", ignore = true)
  @Mapping(target = "lastModifiedDate", ignore = true)
  RequestEntity toEntity(RequestDetailsDTO requestDetailsDTO);

  default RequestEntity fromId(final Long id) {
    if (id == null) {
      return null;
    }
    return RequestEntity.builder()
        .requestId(id)
        .build();
  }
}
