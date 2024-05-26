package com.accolite.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accolite.entities.CandidateSkill;


@Repository
public interface CandidateSkillRepository extends CrudRepository<CandidateSkill, Integer> {

	CandidateSkill findBySkill(String candidateSkill);

}