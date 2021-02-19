package com.ikons.requestmanagement.dataprovider.database.repository;

import com.ikons.requestmanagement.dataprovider.database.entity.SkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity, String> {
}
