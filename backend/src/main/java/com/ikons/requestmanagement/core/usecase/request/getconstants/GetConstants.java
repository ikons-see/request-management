package com.ikons.requestmanagement.core.usecase.request.getconstants;

import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.SkillDTO;

import java.util.Set;

public interface GetConstants {

  Set<SkillDTO> getAllSkills();

  Set<AreaOfInterestDTO> getAllAreaOfInterests();
}
