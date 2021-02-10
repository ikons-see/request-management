package com.ikons.requestmanagement;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

// @AnalyzeClasses(packages = "com.ikons.requestmanagement")
public class ArchTest {

  @Test
  @DisplayName("Test if the core package has any dependencies outside it's package")
  void coreHierarchyDependeciesTest() {
    JavaClasses importedClasses = new ClassFileImporter()
        .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
        .importPackages("com.ikons.requestmanagement");

    noClasses()
        .that()
        .resideInAnyPackage("com.ikons.requestmanagement.core..")
        .should().dependOnClassesThat()
        .resideInAnyPackage("com.ikons.requestmanagement.config..", "com.ikons.requestmanagement.dataprovider..", "com.ikons.requestmanagement.web..")
    .because("Core packages shouldn't depend on other layers, rather then itself")
    .check(importedClasses);
  }
}
