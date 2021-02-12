package com.ikons.requestmanagement.dataprovider.database.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.query.QueryService;
import com.ikons.query.filter.StringFilter;
import com.ikons.requestmanagement.core.criteria.RequestCriteria;
import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.RequestDetailsDTO;
import com.ikons.requestmanagement.core.dto.RequestStatusDTO;
import com.ikons.requestmanagement.core.dto.ResourceDTO;
import com.ikons.requestmanagement.core.dto.*;
import com.ikons.requestmanagement.core.usecase.reports.ReportResults;
import com.ikons.requestmanagement.core.usecase.request.RequestDetailsManagement;
import com.ikons.requestmanagement.core.usecase.request.closerequest.CloseRequest;
import com.ikons.requestmanagement.core.usecase.request.deleterequest.DeleteRequest;
import com.ikons.requestmanagement.core.usecase.request.exception.MissingRequestException;
import com.ikons.requestmanagement.core.usecase.request.newrequest.CreateRequest;
import com.ikons.requestmanagement.core.usecase.request.updaterequest.UpdateRequest;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity_;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.StateHistoryEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity_;
import com.ikons.requestmanagement.dataprovider.database.mapper.RequestMapper;
import com.ikons.requestmanagement.dataprovider.database.mapper.ResourceMapper;
import com.ikons.requestmanagement.dataprovider.database.mapper.StateHistoryMapper;
import com.ikons.requestmanagement.dataprovider.database.repository.RequestRepository;
import com.ikons.requestmanagement.dataprovider.database.repository.ResourceRepository;
import com.ikons.requestmanagement.dataprovider.database.repository.StateHistoryRepository;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
public class RequestDetailsManagementImpl extends QueryService<RequestEntity>
    implements RequestDetailsManagement,
    CreateRequest,
    DeleteRequest,
    UpdateRequest,
    CloseRequest,
    ReportResults
{

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final RequestRepository requestRepository;
    private final ResourceRepository resourceRepository;
    private final UserManagement userManagement;
    private final RequestMapper requestMapper;
    private final ResourceMapper resourceMapper;
    private final StateHistoryMapper stateHistoryMapper;
    private final StateHistoryRepository stateHistoryRepository;

    public RequestDetailsManagementImpl(
            final RequestRepository requestRepository,
            final ResourceRepository resourcesRepository,
            final UserManagement userManagement,
            final RequestMapper requestMapper,
            final ResourceMapper resourceMapper,
            final StateHistoryMapper stateHistoryMapper, final StateHistoryRepository stateHistoryRepository) {
        this.requestRepository = requestRepository;
        this.resourceRepository = resourcesRepository;
        this.userManagement = userManagement;
        this.requestMapper = requestMapper;
        this.resourceMapper = resourceMapper;
        this.stateHistoryMapper = stateHistoryMapper;
        this.stateHistoryRepository = stateHistoryRepository;
    }

    @Override
    @Transactional
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
                .areaOfInterest(areaOfInterest)
                .startDate(startDate)
                .endDate(endDate)
                .status(RequestStatusDTO.CREATED.name())
                .projectDescription(projectDescription)
                .notes(otherNotes)
                .resources(new ArrayList<>())
                .build();

    if (resources != null) {
      createNewResources(resources, entity);
    }

    requestRepository.save(entity);

    return entity.getRequestId();
  }

  @Override
  public RequestDetailsDTO getRequestDetails(final long requestId) {
    final RequestEntity requestEntity = requestRepository.findById(requestId).orElseThrow(() -> new MissingRequestException(requestId));
    return requestMapper.toDto(requestEntity);
  }

  @Override
  public List<RequestDetailsDTO> getAllRequests(final Pageable pageable) {
    final Page<RequestEntity> requestEntities = requestRepository.findAll(pageable);
    return requestEntities.stream().filter(Objects::nonNull).map(a -> {
      return requestMapper.toDto(a);
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
    return requestEntities.stream().filter(Objects::nonNull).map(a -> requestMapper.toDto(a)).collect(Collectors.toList());
  }

    @Override
    @Transactional
    public void logRequestState(long requestId, String user, RequestStatusDTO status, String notes) {
        final StateHistoryEntity stateHistoryEntity = StateHistoryEntity.builder()
                .operation(status.name())
                .createdBy(user)
                .requestId(requestId)
                .notes(notes)
                .build();
        stateHistoryRepository.save(stateHistoryEntity);

    }

    @Override
    public List<RequestStateHistoryDTO> getStateHistory(long requestId) {
        final List<StateHistoryEntity> stateHistoryEntities = stateHistoryRepository.findByRequestId(requestId);
        return stateHistoryEntities.stream().filter(Objects::nonNull).map(a-> {return stateHistoryMapper.toDto(a);}).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void update(final RequestUpdate requestUpdate) {
        Optional<RequestEntity> requestEntity = requestRepository.findById(requestUpdate.getRequestId());

    requestEntity.ifPresent(entity -> {
      entity.setAreaOfInterest(requestUpdate.getAreaOfInterest());
      entity.setStatus(String.valueOf(RequestStatusDTO.UPDATED));
      entity.setStartDate(requestUpdate.getStartDate());
      entity.setEndDate(requestUpdate.getEndDate());
      entity.setNotes(requestUpdate.getNotes());
      entity.setStatusNotes(requestUpdate.getStatusNotes());
      entity.setProjectDescription(requestUpdate.getProjectDescription());

      deleteResources(requestUpdate.getDeletedResourceIds());
      createNewResources(requestUpdate.getNewResources(), entity);

    });
  }

  public void deleteResources(List<Long> deletedResourceIds) {
    if (deletedResourceIds != null && !deletedResourceIds.isEmpty()) {
      resourceRepository.deleteByResourceIdIn(deletedResourceIds);
    }
  }

  @Override
  @Transactional
  public void close(final Long requestId) {
    requestRepository.findById(requestId).ifPresent(requestEntity -> {
      requestEntity.setStatus(RequestStatusDTO.CLOSED.toString());
      requestRepository.saveAndFlush(requestEntity);
    });
  }

  @Override
  @Transactional
  public void delete(final Long requestId) {
    requestRepository.findById(requestId).ifPresent(requestRepository::delete);
  }

  @Override
  @Transactional
  public void changeStatus(final long requestId, final RequestStatusDTO requestStatus, final String note) {
    final RequestEntity requestEntity = requestRepository.findById(requestId).orElseThrow(() -> new MissingRequestException(requestId));
    requestEntity.setStatus(requestStatus.name());
    requestEntity.setStatusNotes(note);
    requestRepository.save(requestEntity);
  }

  private void createNewResources(final List<ResourceDTO> resources, final RequestEntity entity) {
    if (resources != null) {
      resources.stream().forEach(resourceDTO -> {
        ResourceEntity resourceEntity = resourceMapper.toEntity(resourceDTO);
        resourceEntity.setRequest(entity);
        entity.getResources().add(resourceEntity);
      });
    }
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
      if (criteria.getAreaOfInterest() != null) {
        specification = specification.and(buildSpecification(criteria.getAreaOfInterest(), RequestEntity_.areaOfInterest));
      }
      if (criteria.getDisplayName() != null) {
        specification = specification.and(buildStringSpecification(criteria.getDisplayName(), RequestEntity_.createdBy));
      }
      if (criteria.getStatus() != null) {
        specification = specification.and(buildStringSpecification(criteria.getStatus(), RequestEntity_.status));
      }
      if (criteria.getStartDate() != null) {
        specification = specification.and(buildRangeSpecification(criteria.getStartDate(), RequestEntity_.startDate));
      }
      if (criteria.getEndDate() != null) {
        specification = specification.and(buildRangeSpecification(criteria.getEndDate(), RequestEntity_.endDate));
      }

      if (criteria.getNumberOfResource() != null) {
        specification = specification.and(buildSpecification(
            criteria.getNumberOfResource(),
            root -> root.join(RequestEntity_.resources, JoinType.LEFT).get(ResourceEntity_.total)
            )
        );
      }
      if (criteria.getSeniorityOfResource() != null) {
        specification = specification.and(buildSpecification(
            criteria.getSeniorityOfResource(),
            root -> root.join(RequestEntity_.resources, JoinType.LEFT).get(ResourceEntity_.seniority)
            )
        );
      }
      if (criteria.getSkillsOfResource() != null && criteria.getSkillsOfResource().length > 0) {
        StringFilter[] skillsFilter = criteria.getSkillsOfResource();
        Specification<RequestEntity> spec = buildSpecification(
            skillsFilter[0],
            root -> root.join(RequestEntity_.resources, JoinType.LEFT).get(ResourceEntity_.skills)
        );
        for (int i = 1; i < skillsFilter.length ; i++) {
          spec = spec.or(
              buildSpecification(
                  skillsFilter[i],
                  root -> root.join(RequestEntity_.resources, JoinType.LEFT).get(ResourceEntity_.skills)
              )
          );
        }
        specification = specification.and(spec);
      }
    }
    return specification;
  }


  @Override
  public List<MonthlyReportsDto> requestsPerMonth() {
    return requestRepository.totalRequestsPerMonth();
  }


  @Override
  public List<MonthlyReportsDto> resourcesPerMonth() {
    return requestRepository.totalResourcesPerMonth();
  }

  @Override
  public Long totalActiveRequests() {
    return requestRepository.countAllActiveRequests(RequestStatusDTO.CLOSED.name());
  }

  @Override
  public Long totalOnGoingRequests() {
    return requestRepository.countAllOnGoingRequests(RequestStatusDTO.ON_GOING.name());
  }

  @Override
  public Long totalRequests() {
    return requestRepository.count();
  }
}
