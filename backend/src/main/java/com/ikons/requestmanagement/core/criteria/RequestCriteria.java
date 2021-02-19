package com.ikons.requestmanagement.core.criteria;

import com.ikons.query.Criteria;
import com.ikons.query.filter.*;
import com.ikons.requestmanagement.core.dto.AreaOfInterestDTO;
import com.ikons.requestmanagement.core.dto.SeniorityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestCriteria implements Serializable, Criteria {
  private StringFilter areaOfInterest;
  private StringFilter displayName;
  private StringFilter status;
  private InstantFilter startDate;
  private InstantFilter endDate;

  private IntegerFilter numberOfResource;
  private SeniorityFilter seniorityOfResource;
  private StringFilter skillsOfResource;


  @Override
  public Criteria copy() {
    return new RequestCriteria(
        areaOfInterest,
        displayName,
        status,
        startDate,
        endDate,
        numberOfResource,
        seniorityOfResource,
        skillsOfResource
    );
  }

  /**
   * Class for filtering Seniority
   */
  public static class SeniorityFilter extends Filter<SeniorityDTO> {

    public SeniorityFilter() {
    }

    public SeniorityFilter(SeniorityFilter filter) {
      super(filter);
    }

    @Override
    public SeniorityFilter copy() {
      return new SeniorityFilter(this);
    }

  }
}
