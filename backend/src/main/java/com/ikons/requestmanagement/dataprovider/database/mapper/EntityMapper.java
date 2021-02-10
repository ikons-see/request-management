package com.ikons.requestmanagement.dataprovider.database.mapper;

import java.util.List;

/**
 *
 * @param <E> - entity type param
 * @param <DTO> - dto type param
 */
public interface EntityMapper<E, DTO> {
  DTO toDto(E entity);
  List<DTO> toDTO(List<E> entities);

  E toEntity(DTO dto);
  List<E> toEntity(List<DTO> dtos);
}
