package com.ikons.requestmanagement.dataprovider.database.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.query.QueryService;
import com.ikons.requestmanagement.core.criteria.RequestCriteria;
import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.core.usecase.CannotDeserializeException;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.exception.MissingRequestException;
import com.ikons.requestmanagement.core.usecase.request.newrequest.CreateRequest;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity_;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.mapper.RequestMapper;
import com.ikons.requestmanagement.dataprovider.database.repository.RequestRepository;
import com.ikons.requestmanagement.dataprovider.database.repository.ResourceRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Log4j2
@Service
public class RequestDetailsManagementImpl extends QueryService<RequestEntity>
    implements RequestDetailsManagement, CreateRequest {

  private static final ObjectMapper objectMapper = new ObjectMapper();
  private final RequestRepository requestRepository;
  private final ResourceRepository resourceRepository;
  private final UserManagement userManagement;
  private final RequestMapper requestMapper;

  public RequestDetailsManagementImpl(
      final RequestRepository requestRepository,
      final ResourceRepository resourcesRepository,
      final UserManagement userManagement,
      final RequestMapper requestMapper
  ) {
    this.requestRepository = requestRepository;
    this.resourceRepository = resourcesRepository;
    this.userManagement = userManagement;
    this.requestMapper = requestMapper;
  }

  @Override
  public long createNewRequest(
      final AreaOfInterestDTO areaOfInterest,
      final Instant startDate,
      final Instant endDate,
      final String projectDescription,
      final String otherNotes,
      final String user,
      final List<ResourceDTO> resources
  ) {
    final RequestEntity entity = RequestEntity.builder()
        .areaOfInterest(areaOfInterest.name())
        .startDate(startDate)
        .endDate(endDate)
        .status(RequestStatusDTO.CREATED.name())
        .projectDescription(projectDescription)
        .notes(otherNotes)
        .resources(new ArrayList<>())
        .build();
    entity.setCreatedBy(user);

    requestRepository.save(entity);

    if (resources != null) {

      for (ResourceDTO resources1 : resources) {
        ResourceEntity resourcesEntity = null;
        try {
          resourcesEntity = ResourceEntity.builder()
              .request(entity)
              .seniority(resources1.getSeniority()).skills(objectMapper.writeValueAsString(resources1.getSkills())).notes(resources1.getNotes()).total(resources1.getTotal()).build();
        } catch (JsonProcessingException e) {
          log.catching(e);
        }
        entity.getResources().add(resourcesEntity);
      }

      requestRepository.save(entity);
    }
    return entity.getRequestId();
  }

  @Override
  public RequestDetailsDTO getRequestDetails(final long requestId) {
    final RequestEntity requestEntity = requestRepository.findById(requestId).orElseThrow(() -> new MissingRequestException(requestId));
    return mapRequestDetails(requestEntity);
  }

  @Override
  public List<RequestDetailsDTO> getAllRequests(final Pageable pageable) {
    final Page<RequestEntity> requestEntities = requestRepository.findAll(pageable);
    return requestEntities.stream().filter(Objects::nonNull).map(a -> {
      return mapRequestDetails(a);
    }).collect(Collectors.toList());
  }

  @Override
  public Page<RequestDetailsDTO> getRequests(final RequestCriteria criteria, final Pageable pageable) {
    log.debug("find by criteria : {}", criteria);
    final Specification<RequestEntity> specification = createSpecification(criteria);
    return requestRepository.findAll(specification, pageable).map(requestMapper::toDto);
  }

  @Override
  public long countAllRequests() {
    return requestRepository.count();
  }

  @Override
  public long countUserRequests(final String userId) {
    return requestRepository.countByCreatedBy(userId);
  }

  @Override
  public List<RequestDetailsDTO> getUserRequests(final String userId, final Pageable pageable) {
    final List<RequestEntity> requestEntities = requestRepository.findByCreatedBy(userId, pageable);
    return requestEntities.stream().filter(Objects::nonNull).map(a -> {
      return mapRequestDetails(a);
    }).collect(Collectors.toList());
  }

  private RequestDetailsDTO mapRequestDetails(final RequestEntity requestEntity) {
    // TODO: create mapper RequestDetailsDTO <-> RequestEntity
    return RequestDetailsDTO.builder()
        .requestId(requestEntity.getRequestId())
        .displayName(requestEntity.getCreatedBy())
        .areaOfInterest(requestEntity.getAreaOfInterest())
        .status(requestEntity.getStatus())
        .endDate(requestEntity.getEndDate())
        .startDate(requestEntity.getStartDate())
        .projectDescription(requestEntity.getProjectDescription())
        .notes(requestEntity.getNotes())
        .resources(requestEntity.getResources().stream()
            .filter(Objects::nonNull)
            .map(a -> {
              try {
                return ResourceDTO.builder()
                    .seniority(a.getSeniority())
                    .skills(a.getSkills() == null ? Collections.emptyList() : objectMapper.readValue(a.getSkills(), List.class))
                    .notes(a.getNotes())
                    .total(a.getTotal()).build();
              } catch (JsonProcessingException e) {
                throw new CannotDeserializeException(e);
              }
            })
            .collect(Collectors.toList()))
        .build();
  }

  /**
   * Function to convert {@link RequestEntity} to a {@link Specification}
   *
   * @param criteria The object which holds all the filters, which the entities should match.
   * @return the matching {@link Specification} of the entity.
   */
  protected Specification<RequestEntity> createSpecification(RequestCriteria criteria) {
    Specification<RequestEntity> specification = Specification.where(null);
    if (criteria != null) {
      if (criteria.getAreOfInterest() != null) {
        specification = specification.and(buildStringSpecification(criteria.getAreOfInterest(), RequestEntity_.areaOfInterest));
      }
      if (criteria.getDisplayName() != null) {
        specification = specification.and(buildStringSpecification(criteria.getDisplayName(), RequestEntity_.createdBy));
      }
      if (criteria.getStartDate() != null) {
        specification = specification.and(buildRangeSpecification(criteria.getStartDate(), RequestEntity_.startDate));
      }
      if (criteria.getEndDate() != null) {
        specification = specification.and(buildRangeSpecification(criteria.getEndDate(), RequestEntity_.endDate));
      }
    }
    return specification;
  }


}
