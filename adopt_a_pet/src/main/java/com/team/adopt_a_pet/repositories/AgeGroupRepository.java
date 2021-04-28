package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.team.adopt_a_pet.models.AgeGroup;

@Repository
public interface AgeGroupRepository extends CrudRepository<AgeGroup, Long> {
	List<AgeGroup> findAll();
}
