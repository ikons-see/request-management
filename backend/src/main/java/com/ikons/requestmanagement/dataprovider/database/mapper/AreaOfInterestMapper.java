package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.SkillDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.AreaOfInterestEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.SkillEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AreaOfInterestMapper extends EntityMapper<AreaOfInterestEntity, AreaOfInterestDTO>{

  AreaOfInterestDTO toDto(AreaOfInterestEntity entity);

  AreaOfInterestEntity toEntity(AreaOfInterestDTO areaOfInterestDTO);
}
