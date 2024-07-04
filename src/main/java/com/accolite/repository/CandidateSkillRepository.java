package com.accolite.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accolite.entities.CandidateSkill;


@Repository
public interface CandidateSkillRepository extends CrudRepository<CandidateSkill, Integer> {

	@Query("SELECT c FROM CandidateSkill c WHERE c.skill = :skills")
	CandidateSkill findBySkills(String skills);

	CandidateSkill findBySkill(String skillName);

	boolean existsBySkill(String skills);

}
