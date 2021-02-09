package com.ikons.requestmanagement.core.criteria;

import com.ikons.query.Criteria;
import com.ikons.query.filter.InstantFilter;
import com.ikons.query.filter.LocalDateFilter;
import com.ikons.query.filter.StringFilter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class RequestCriteria implements Serializable, Criteria {
  private StringFilter areOfInterest;
  private StringFilter displayName;
  private StringFilter status;
  private InstantFilter startDate;
  private InstantFilter endDate;


  @Override
  public Criteria copy() {
    return new RequestCriteria(
        areOfInterest,
        displayName,
        status,
        startDate,
        endDate
    );
  }
}
