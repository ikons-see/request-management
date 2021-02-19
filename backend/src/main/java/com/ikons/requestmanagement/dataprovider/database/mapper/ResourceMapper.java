package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.Authority;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.SkillEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {SkillMapper.class})
public interface ResourceMapper extends EntityMapper<ResourceEntity, ResourceDTO> {
  final ObjectMapper objectMapper = new ObjectMapper();

  @Mapping(source = "skills", target = "skills", qualifiedByName = "skillEntitiesToStrings")
  @Mapping(source = "notes", target = "note")
  ResourceDTO toDto(ResourceEntity entity);

  @Mapping(target = "resourceId", ignore = true)
  @Mapping(target = "request", ignore = true)
  @Mapping(source = "note", target = "notes")
  @Mapping(source = "skills", target = "skills", qualifiedByName = "stringsToSkillEntities")
  ResourceEntity toEntity(ResourceDTO resourceDTO);

  @Named("stringToList")
  static Set<String> skillEntitiesToStrings(Set<SkillEntity> skills) {
    if (skills == null || skills.isEmpty()) {
      return new HashSet<String>();
    }
    return skills.stream()
        .map(SkillEntity::getSkill)
        .collect(Collectors.toSet());
  }

  @Named("listToString")
  static Set<SkillEntity> stringsToSkillEntities(Set<String> skillsString) {
    Set<SkillEntity> skills = new HashSet<>();

    if (skills != null) {
      skills = skillsString.stream().map(skill -> SkillEntity.builder().skill(skill).build()).collect(Collectors.toSet());
    }

    return skills;

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
