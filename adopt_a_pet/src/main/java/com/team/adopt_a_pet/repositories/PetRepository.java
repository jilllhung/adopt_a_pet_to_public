package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.team.adopt_a_pet.models.PetModel;

public interface PetRepository extends CrudRepository<PetModel, Long>{
	List<PetModel> findAll();
}