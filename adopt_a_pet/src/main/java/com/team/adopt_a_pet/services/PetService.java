package com.team.adopt_a_pet.services;

import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.Pet;
import com.team.adopt_a_pet.repositories.PetRepository;

@Service
public class PetService {
	public final PetRepository petRepo;
	
	public PetService(PetRepository petRepo) {
		this.petRepo = petRepo;
	}
	
	public Pet createFakePet() {
		Pet newPet = new Pet("Sunny", "adorable puppy", "Colorado Springs", "CO", "80918", "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=064680b85e72644d9cc2e69e2763c541");

		return newPet;
	}
	
	//getAllPets
	
	//getSpecificPet
	
	//deletePet
	
	
}