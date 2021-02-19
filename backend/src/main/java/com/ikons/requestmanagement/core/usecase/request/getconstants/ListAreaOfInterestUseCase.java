package com.ikons.requestmanagement.core.usecase.request.getconstants;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ListAreaOfInterestUseCase {

  private final GetConstants getConstants;

  public ListAreaOfInterestUseCase(GetConstants getConstants) {
    this.getConstants = getConstants;
  }

  public Set<AreaOfInterestDTO> getAreaOfInterests(){
    return getConstants.getAllAreaOfInterests();
  }
}
