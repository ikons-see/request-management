package com.ikons.requestmanagement.dataprovider.database.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.RequestStatus;
import com.ikons.requestmanagement.core.entity.Resource;
import com.ikons.requestmanagement.core.usecase.CannotDeserializeException;
import com.ikons.requestmanagement.core.usecase.request.close.CloseRequestProvider;
import com.ikons.requestmanagement.core.usecase.request.create.CreateRequest;
import com.ikons.requestmanagement.core.usecase.request.GetRequest;
import com.ikons.requestmanagement.core.usecase.request.delete.DeleteRequestProvider;
import com.ikons.requestmanagement.core.usecase.request.exception.MissingRequestException;
import com.ikons.requestmanagement.core.usecase.request.update.UpdateRequestProvider;
import com.ikons.requestmanagement.core.usecase.user.UserManagement;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.repository.RequestRepository;
import com.ikons.requestmanagement.dataprovider.database.repository.ResourceRepository;
import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.requests.RequestUpdate;
import com.ikons.requestmanagement.web.rest.responses.RequestDetails;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@Service
public class RequestManagementImpl implements GetRequest, UpdateRequestProvider, CloseRequestProvider, DeleteRequestProvider, CreateRequest {

    private final RequestRepository requestRepository;
    private final ResourceRepository resourceRepository;
    private final UserManagement userManagement;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public RequestManagementImpl(final RequestRepository requestRepository, final ResourceRepository resourcesRepository, final UserManagement userManagement) {
        this.requestRepository = requestRepository;
        this.resourceRepository = resourcesRepository;
        this.userManagement = userManagement;
    }

    @Override
    public long createNewRequest(final AreaOfInterest areaOfInterest, final Date startDate, final Date endDate,
                                 final String projectDescription, final String otherNotes,
                                 final Long userId,
                                 final List<Resource> resources
    ) {
        final RequestEntity entity = RequestEntity.builder()
                .areaOfInterest(areaOfInterest.name())
                .startDate(startDate)
                .endDate(endDate)
                .status(RequestStatus.CREATED.toString())
                .projectDescription(projectDescription)
                .notes(otherNotes)
                .resources(new ArrayList<>())
                .build();
        //entity.setCreatedBy(userId);

        createNewResources(resources, entity);

        requestRepository.save(entity);

        return entity.getRequestId();
    }

    private void createNewResources(List<Resource> resources, RequestEntity entity) {
        if (resources != null) {
            final List<ResourceEntity> resourcesEntities = resources.stream().map(resource -> {
                final ResourceEntity resourceEntity = new ResourceEntity();
                resourceEntity.setRequest(entity);
                resourceEntity.setSeniority(resource.getSeniority());
                try {
                    resourceEntity.setSkills(objectMapper.writeValueAsString(resource.getSkills()));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                resourceEntity.setNotes(resource.getNotes());
                resourceEntity.setTotal(resource.getTotal());
                return resourceEntity;
            }).collect(Collectors.toList());

            entity.getResources().addAll(resourcesEntities);
        }
    }

    @Override
    public RequestDetails getRequestDetails(final long requestId) {
        final RequestEntity requestEntity = requestRepository.findById(requestId).orElseThrow(() -> new MissingRequestException(requestId));
        return mapRequestDetails(requestEntity);
    }

    @Override
    public List<RequestDetails> getAllRequests(final PaginationParams paginationParams) {
        final List<RequestEntity> requestEntities = requestRepository.findAll(PageRequest.of(paginationParams.getPage() - 1, paginationParams.getSize()));
        return requestEntities.stream().filter(Objects::nonNull).map(a -> {
            return mapRequestDetails(a);
        }).collect(Collectors.toList());
    }

    @Override
    public long countAllRequests() {
        return requestRepository.count();
    }

    @Override
    public long countUserRequests(final Long userId) {
        return requestRepository.countByCreatedBy(userId);
    }

    @Override
    public List<RequestDetails> getUserRequests(final Long userId, final PaginationParams paginationParams) {
        final List<RequestEntity> requestEntities = requestRepository.findByCreatedBy(userId, PageRequest.of(paginationParams.getPage() - 1, paginationParams.getSize()));
        return requestEntities.stream().filter(Objects::nonNull).map(a -> {
            return mapRequestDetails(a);
        }).collect(Collectors.toList());
    }

    private RequestDetails mapRequestDetails(final RequestEntity requestEntity) {
       // final User userEntity = userManagement.getUser(requestEntity.getCreatedBy());

        return RequestDetails.builder()
                .requestId(requestEntity.getRequestId())
                //.displayName(requestEntity.getcr)
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
                                return Resource.builder()
                                        .resourceId(a.getResourceId())
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

    @Override
    @Transactional
    public void update(final RequestUpdate requestUpdate) {
        Optional<RequestEntity> requestEntity = requestRepository.findById(requestUpdate.getRequestId());

        requestEntity.ifPresent(entity -> {
            entity.setAreaOfInterest(requestUpdate.getAreaOfInterest().toString());
            entity.setStatus(String.valueOf(RequestStatus.UPDATED));
            entity.setStartDate(requestUpdate.getStartDate());
            entity.setEndDate(requestUpdate.getEndDate());
            entity.setNotes(requestUpdate.getNotes());
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

    public void close(final Long requestId) {
        requestRepository.findById(requestId).ifPresent(requestEntity -> {
            requestEntity.setStatus(RequestStatus.CLOSED.toString());
            requestRepository.save(requestEntity);
        });
    }

    @Override
    public void delete(final Long requestId) {
        requestRepository.findById(requestId).ifPresent(requestRepository::delete);
    }

}
