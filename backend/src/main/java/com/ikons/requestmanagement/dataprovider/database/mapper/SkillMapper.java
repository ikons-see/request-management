package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.SkillDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.Authority;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.SkillEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SkillMapper extends EntityMapper<SkillEntity, SkillDTO>{

  SkillDTO toDto(SkillEntity entity);

  SkillEntity toEntity(SkillDTO skillDTO);

  default SkillEntity fromId(final String id) {
    if (id == null) {
      return null;
    }
    return SkillEntity.builder()
        .skill(id)
        .build();
  }
}
