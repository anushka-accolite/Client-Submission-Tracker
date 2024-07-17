package com.accolite.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accolite.entities.Candidate;
import com.accolite.entities.Client;

@Repository
public interface CandidateRepository extends CrudRepository<Candidate, Integer> {


}
