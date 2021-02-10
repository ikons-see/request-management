package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ResourceMapper extends EntityMapper<ResourceEntity, ResourceDTO> {
  final ObjectMapper objectMapper = new ObjectMapper();

  @Mapping(source = "skills", target = "skills", qualifiedByName = "stringToList")
  ResourceDTO toDto(ResourceEntity entity);

  @Mapping(target = "resourceId", ignore = true)
  @Mapping(target = "request", ignore = true)
  @Mapping(source = "skills", target = "skills", qualifiedByName = "listToString")
  ResourceEntity toEntity(ResourceDTO resourceDTO);

  @Named("stringToList")
  static List<String> stringToList(String value) throws JsonProcessingException {
    return value == null ? Collections.emptyList() : objectMapper.readValue(value, List.class);
  }

  @Named("listToString")
  static String listToString(List<String> value) throws JsonProcessingException {
    return value == null ? "" : objectMapper.writeValueAsString(value);
  }

  default ResourceEntity fromId(final Long id) {
    if (id == null) {
      return null;
    }
    return ResourceEntity.builder()
        .resourceId(id)
        .build();
  }
}
