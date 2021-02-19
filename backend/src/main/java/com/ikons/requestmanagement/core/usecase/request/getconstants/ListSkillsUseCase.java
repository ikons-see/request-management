package com.ikons.requestmanagement.core.usecase.request.getconstants;

import com.ikons.requestmanagement.core.dto.SkillDTO;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ListSkillsUseCase {

  private final GetConstants getConstants;

  public ListSkillsUseCase(GetConstants getConstants) {
    this.getConstants = getConstants;
  }

  public Set<SkillDTO> getSkills(){
    return getConstants.getAllSkills();
  }
}
