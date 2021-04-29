package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

import com.team.adopt_a_pet.models.Pet;

public interface PetRepository extends JpaRepository<Pet, Long>{
	List<Pet> findAll();
}