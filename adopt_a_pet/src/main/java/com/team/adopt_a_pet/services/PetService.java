package com.team.adopt_a_pet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.Pet;
import com.team.adopt_a_pet.repositories.PetRepository;

@Service
public class PetService {
	@Autowired
	private PetRepository petRepo;
	@Autowired
	private  AgeGroupService ageGroupServ;
	
	public Pet createFakePet() {
		Pet newPet = new Pet("Sunny", "adorable puppy", "Colorado Springs", "CO", "80918", "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=064680b85e72644d9cc2e69e2763c541");
		
		return newPet;
	}
	public void dummyPetToDataBase() {
		Pet newPet1 = new Pet("Fred", "adorable puppy", "Colorado Springs", "CO", "80918", "https://pbs.twimg.com/profile_images/813320088916869120/O5uI0pEt.jpg");
		newPet1.setAgeGroup(ageGroupServ.getAgeGroupByName("Young"));
		petRepo.save(newPet1);
	}
	
	//create or update
	public Pet createPet(Pet pet) {
		return petRepo.save(pet);
	}
	
	//getAllPets
	public List<Pet> getAllPets(){
		return petRepo.findAll();
	}
	//getSpecificPet
	public Pet getPet(Long id) {
		Optional<Pet> optionalPet = petRepo.findById(id);
		return optionalPet.orElse(null);
	}
	//deletePet
	public void deletePet(Long id) {
		petRepo.deleteById(id);
	}
	
}