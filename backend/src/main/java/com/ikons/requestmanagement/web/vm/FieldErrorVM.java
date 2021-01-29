package com.ikons.requestmanagement.web.vm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FieldErrorVM implements Serializable {

  private static final long serialVersionUID = 1L;

  private String objectName;

  private String field;

  private String message;

}
