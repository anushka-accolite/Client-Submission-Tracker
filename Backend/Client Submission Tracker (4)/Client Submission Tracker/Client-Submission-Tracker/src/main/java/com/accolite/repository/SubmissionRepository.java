package com.accolite.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accolite.entities.SubmissionToClient;

@Repository
public interface SubmissionRepository extends CrudRepository<SubmissionToClient, Integer>{

	List<SubmissionToClient> findByUsers_UserId(Integer userId);

}
