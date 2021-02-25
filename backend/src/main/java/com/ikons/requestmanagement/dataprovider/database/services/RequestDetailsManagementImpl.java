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
import com.ikons.requestmanagement.core.usecase.request.getconstants.GetConstants;
import com.ikons.requestmanagement.core.usecase.request.newrequest.CreateRequest;
import com.ikons.requestmanagement.core.usecase.request.updaterequest.UpdateRequest;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.*;
import com.ikons.requestmanagement.dataprovider.database.mapper.*;
import com.ikons.requestmanagement.dataprovider.database.repository.*;
import com.ikons.requestmanagement.security.AuthoritiesConstants;
import com.ikons.requestmanagement.security.SecurityUtils;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import com.ikons.requestmanagement.web.rest.requests.StatusNote;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Log4j2
@Service
public class RequestDetailsManagementImpl extends QueryService<RequestEntity>
    implements RequestDetailsManagement,
    CreateRequest,
    DeleteRequest,
    UpdateRequest,
    CloseRequest,
    ReportResults,
    GetConstants {

  private static final ObjectMapper objectMapper = new ObjectMapper();
  private final RequestRepository requestRepository;
  private final ResourceRepository resourceRepository;
  private final UserManagement userManagement;
  private final RequestMapper requestMapper;
  private final ResourceMapper resourceMapper;
  private final StateHistoryMapper stateHistoryMapper;
  private final StateHistoryRepository stateHistoryRepository;
  private final SkillRepository skillRepository;
  private final SkillMapper skillMapper;
  private final AreaOfInterestRepository areaOfInterestRepository;
  private final AreaOfInterestMapper areaOfInterestMapper;

  public RequestDetailsManagementImpl(
      final RequestRepository requestRepository,
      final ResourceRepository resourcesRepository,
      final UserManagement userManagement,
      final RequestMapper requestMapper,
      final ResourceMapper resourceMapper,
      final StateHistoryMapper stateHistoryMapper, final StateHistoryRepository stateHistoryRepository, SkillRepository skillRepository, SkillMapper skillMapper, AreaOfInterestRepository areaOfInterestRepository, AreaOfInterestMapper areaOfInterestMapper) {
    this.requestRepository = requestRepository;
    this.resourceRepository = resourcesRepository;
    this.userManagement = userManagement;
    this.requestMapper = requestMapper;
    this.resourceMapper = resourceMapper;
    this.stateHistoryMapper = stateHistoryMapper;
    this.stateHistoryRepository = stateHistoryRepository;
    this.skillRepository = skillRepository;
    this.skillMapper = skillMapper;
    this.areaOfInterestRepository = areaOfInterestRepository;
    this.areaOfInterestMapper = areaOfInterestMapper;
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
        .areaOfInterest(createAreaOfInterestEntity(areaOfInterest))
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

  private AreaOfInterestEntity createAreaOfInterestEntity(AreaOfInterestDTO areaOfInterest) {
    return AreaOfInterestEntity.builder().areaOfInterest(areaOfInterest.getAreaOfInterest()).build();
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
  public Page<RequestDetailsDTO> getRequests(RequestCriteria criteria, final Pageable pageable) {
    log.debug("find by criteria : {}", criteria);
    if (criteria == null) {
      criteria = new RequestCriteria();
    }
    if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
      StringFilter stringFilter = new StringFilter();
      stringFilter.setEquals(SecurityUtils.getCurrentUserLogin().get());
      criteria.setDisplayName(stringFilter);
    }
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
    return stateHistoryEntities.stream().filter(Objects::nonNull).map(a -> {
      return stateHistoryMapper.toDto(a);
    }).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void update(final RequestUpdate requestUpdate) {
    Optional<RequestEntity> requestEntity = requestRepository.findById(requestUpdate.getRequestId());

    requestEntity.ifPresent(entity -> {
      entity.setAreaOfInterest(createAreaOfInterestEntity(requestUpdate.getAreaOfInterest()));
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
  public void close(final Long requestId, final StatusNote statusNote) {
    requestRepository.findById(requestId).ifPresent(requestEntity -> {
      requestEntity.setStatus(RequestStatusDTO.CLOSED.toString());
      requestEntity.setStatusNotes(statusNote.getNotes());
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
        final Set<SkillEntity> allBySkill = skillRepository.findAllById(resourceDTO.getSkills())
            .stream()
            .collect(Collectors.toSet());
        resourceEntity.setSkills(allBySkill);
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
        specification = specification.and(buildSpecification(
            criteria.getAreaOfInterest(),
            root -> root.join(RequestEntity_.areaOfInterest, JoinType.LEFT).get(AreaOfInterestEntity_.areaOfInterest)
            )
        );
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
      if (criteria.getSkillsOfResource() != null) {
        specification = specification.and(buildSpecification(
            criteria.getSkillsOfResource(),
            root -> root.join(RequestEntity_.resources, JoinType.LEFT)
                .join(ResourceEntity_.skills, JoinType.LEFT)
                .get(SkillEntity_.skill)
            )
        );
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

  @Override
  public List<RequestCsvDTO> requestsCsv() {
    return requestRepository.requestsCsvDto(RequestStatusDTO.CLOSED.name());
  }

  @Override
  public Set<SkillDTO> getAllSkills() {
    final Iterable<SkillEntity> allSkillEntities = skillRepository.findAll();
    return StreamSupport.stream(allSkillEntities.spliterator(), false)
        .filter(Objects::nonNull)
        .map(skillEntity -> {
          return skillMapper.toDto(skillEntity);
        }).collect(Collectors.toSet());
  }

  @Override
  public Set<AreaOfInterestDTO> getAllAreaOfInterests() {
    final Iterable<AreaOfInterestEntity> allAreaOfInterestEntities = areaOfInterestRepository.findAll();
//    StreamSupport.stream(allAreaOfInterestEntities.spliterator(), false)
//        .filter(Objects::nonNull)
//        .map(AreaOfInterestEntity::getAreaOfInterest)
//        .collect(Collectors.toList());
    return StreamSupport.stream(allAreaOfInterestEntities.spliterator(), false)
        .filter(Objects::nonNull)
        .map(entity -> {
          return areaOfInterestMapper.toDto(entity);
        }).collect(Collectors.toSet());
  }
}
