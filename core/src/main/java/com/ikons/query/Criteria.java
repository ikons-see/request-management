package com.ikons.query;

/**
 * Implementation should usually contain fields of Filter instances.
 */
public interface Criteria {
  /**
   * <p>copy.</p>
   *
   * @return a new criteria with copied filters
   */
  Criteria copy();
}
