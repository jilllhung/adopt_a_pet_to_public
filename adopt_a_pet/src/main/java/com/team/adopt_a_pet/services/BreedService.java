package com.team.adopt_a_pet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.Breed;
import com.team.adopt_a_pet.repositories.BreedRepository;

@Service
public class BreedService {
	@Autowired
	private BreedRepository breedRepo;
	
	//create or update
	public Breed createBreed(Breed breed) {
		return breedRepo.save(breed);
	}
	//retrieve all
	public List<Breed> getAllBreeds(){
		return breedRepo.findAll();
	}
	//retrieve a breed
	public Breed getBreed(Long id) {
		Optional<Breed> optionalBreed = breedRepo.findById(id);
		return optionalBreed.orElse(null);
	}
	//delete a breed
	public void deleteBreed(Long id) {
		breedRepo.deleteById(id);
	}
}
