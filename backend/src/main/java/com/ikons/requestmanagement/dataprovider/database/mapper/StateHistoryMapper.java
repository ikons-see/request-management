package com.ikons.requestmanagement.dataprovider.database.mapper;

import com.ikons.requestmanagement.core.dto.RequestStateHistoryDTO;
import com.ikons.requestmanagement.dataprovider.database.entity.StateHistoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ResourceMapper.class)
public interface StateHistoryMapper extends EntityMapper<StateHistoryEntity, RequestStateHistoryDTO> {

    RequestStateHistoryDTO toDto(StateHistoryEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "requestId", ignore = true)
    StateHistoryEntity toEntity(RequestStateHistoryDTO requestStateHistoryDTO);

    default StateHistoryEntity fromId(final Long id) {
        if (id == null) {
            return null;
        }
        return StateHistoryEntity.builder()
                .requestId(id)
                .build();
    }
}
