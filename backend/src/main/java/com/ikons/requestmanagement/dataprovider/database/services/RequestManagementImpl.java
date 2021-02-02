package com.ikons.requestmanagement.dataprovider.database.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ikons.requestmanagement.core.entity.AreaOfInterest;
import com.ikons.requestmanagement.core.entity.RequestStatus;
import com.ikons.requestmanagement.core.entity.Resource;
import com.ikons.requestmanagement.core.usecase.CannotDeserializeException;
import com.ikons.requestmanagement.core.usecase.request.CreateRequest;
import com.ikons.requestmanagement.core.usecase.request.GetRequest;
import com.ikons.requestmanagement.core.usecase.request.exception.MissingRequestException;
import com.ikons.requestmanagement.dataprovider.database.entity.RequestEntity;
import com.ikons.requestmanagement.dataprovider.database.entity.ResourceEntity;
import com.ikons.requestmanagement.dataprovider.database.repository.RequestRepository;
import com.ikons.requestmanagement.dataprovider.database.repository.ResourceRepository;
import com.ikons.requestmanagement.web.rest.requests.PaginationParams;
import com.ikons.requestmanagement.web.rest.responses.RequestDetails;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;

import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@Service
public class RequestManagementImpl implements GetRequest, CreateRequest {

    private final RequestRepository requestRepository;
    private final ResourceRepository resourceRepository;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public RequestManagementImpl(final RequestRepository requestRepository, final ResourceRepository resourcesRepository) {
        this.requestRepository = requestRepository;
        this.resourceRepository = resourcesRepository;
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

        requestRepository.save(entity);

        if (resources != null) {

            for (Resource resources1 : resources
            ) {
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
        return RequestDetails.builder()
                .requestId(requestEntity.getRequestId())
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


}
