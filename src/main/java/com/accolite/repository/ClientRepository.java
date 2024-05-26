package com.accolite.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.accolite.entities.Candidate;
import com.accolite.entities.Client;


@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {

	List<Candidate> findByClientId(Integer clientId);
}