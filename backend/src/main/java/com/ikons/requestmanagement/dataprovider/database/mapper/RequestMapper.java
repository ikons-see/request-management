package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ResourceMapper.class, AreaOfInterestMapper.class})
public interface RequestMapper extends EntityMapper<RequestEntity, RequestDetailsDTO> {

  @Mapping(source = "createdBy", target = "displayName")
  @Mapping(source = "lastModifiedBy", target = "lastModifiedBy")
  @Mapping(source = "areaOfInterest.areaOfInterest", target = "areaOfInterest")
  RequestDetailsDTO toDto(RequestEntity entity);

  @Mapping(target = "createdBy", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "lastModifiedBy", ignore = true)
  @Mapping(target = "lastModifiedDate", ignore = true)
  @Mapping(source = "areaOfInterest", target = "areaOfInterest.areaOfInterest")
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
