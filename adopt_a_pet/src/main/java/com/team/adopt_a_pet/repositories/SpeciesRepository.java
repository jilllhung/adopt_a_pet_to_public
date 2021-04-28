package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.team.adopt_a_pet.models.Species;

@Repository
public interface SpeciesRepository extends CrudRepository<Species, Long>{
	List<Species> findAll();
}
