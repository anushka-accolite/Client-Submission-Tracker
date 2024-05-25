package com.accolite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.accolite.entities.SubmissionToClient;

@Repository
public interface SubmissionRepository extends CrudRepository<SubmissionToClient, Integer>{

	List<SubmissionToClient> findByUsers_UserId(Integer userId);

    boolean existsByCandidate_CandidateId(int candidateId);
    @Query("SELECT s.submissionId FROM SubmissionToClient s WHERE s.candidate.candidateId = :candidateId")
    List<Integer> findSubmissionIdsByCandidateId(@Param("candidateId") int candidateId);
}
