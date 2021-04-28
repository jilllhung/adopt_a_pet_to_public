package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.team.adopt_a_pet.models.Breed;

@Repository
public interface BreedRepository extends CrudRepository<Breed, Long> {
	List<Breed> findAll();
}
