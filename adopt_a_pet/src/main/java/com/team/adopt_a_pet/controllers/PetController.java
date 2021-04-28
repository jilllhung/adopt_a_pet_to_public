package com.team.adopt_a_pet.controllers;


import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.adopt_a_pet.models.AgeGroup;
import com.team.adopt_a_pet.models.Breed;
import com.team.adopt_a_pet.models.Organization;
import com.team.adopt_a_pet.models.Pet;
import com.team.adopt_a_pet.models.Species;
import com.team.adopt_a_pet.models.Test;
import com.team.adopt_a_pet.services.AgeGroupService;
import com.team.adopt_a_pet.services.BreedService;
import com.team.adopt_a_pet.services.OrganizationService;
import com.team.adopt_a_pet.services.PetService;
import com.team.adopt_a_pet.services.SpeciesService;

@RestController //parses object and turns into json for you and then sends it off.
public class PetController {
	@Autowired
	public PetService petServ;
	@Autowired
	public OrganizationService orgServ;
	@Autowired
	public BreedService breedServ;
	@Autowired
	public SpeciesService speciesServ;
	@Autowired
	public AgeGroupService ageGroupServ;
	
	
	@RequestMapping("/getpets")
	public List<Test> test() {
		List<Test> test = new ArrayList<>(); //arraylist inherits from list
		Test dog = new Test();
		dog.setName("daisy");
		Test cat = new Test();
		cat.setName("Clover");
		test.add(dog);
		test.add(cat);
		return test;
		//grab object data and convert to json
		// return json object as a string
	}
	@RequestMapping("/getfakepet")
	public Pet displayFakePet() {
		Pet newPet = petServ.createFakePet();
		return newPet;
	}
	
	//Create and add dummy entities to database
	@RequestMapping("/dummy/organization")
	public List<Organization> createOrgToDataBase() {
		orgServ.addDummyOrg();
		return orgServ.getAllOrganizations();
	}
	@RequestMapping("/dummy/breed")
	public List<Breed> createBreedToDataBase() {
		breedServ.addDummyBreeds();
		return breedServ.getAllBreeds();
	}
	@RequestMapping("/dummy/species")
	public List<Species> createSpeciesToDataBase() {
		speciesServ.addDummySpecies();
		return speciesServ.getAllSpeciess();
	}
	@RequestMapping("/dummy/agegroups")
	public List<AgeGroup> createAgeGroupsToDataBase() {
		ageGroupServ.addDummyAgeGroups();
		return ageGroupServ.getAllAgeGroups();
	}
	@RequestMapping("/dummy/pets")
	public List<Pet> createPetsToDataBase() {
		petServ.dummyPetToDataBase();
		return petServ.getAllPets();
	}
	
	//Get All Pets
	@RequestMapping("/pets/all")
	public List<Pet> getPets(){
		return petServ.getAllPets();
	}
	//Get Specific Pet By ID
	@RequestMapping("/pets/{pid}")
	public Pet getPets(@PathVariable Long pid){
		return petServ.getPet(pid);
	}
	//Get All Pets of a Specific AgeGroup
	@RequestMapping("/pets/agegroup/{age}")
	public List<Pet> getAllPetsOfAgeGroup(@PathVariable String age){
		AgeGroup thisAgeGroup = ageGroupServ.getAgeGroupByName(age);
		return thisAgeGroup.getPets();
	}
	//Create new Pet
	@RequestMapping("/pets/new")
	public Pet getAllPetsOfAgeGroup(){
		List<Pet> ptesting=petServ.getAllPets();
		System.out.println(ptesting);
		return ptesting.get(0);
	}
//    @RequestMapping("/getPets")
//    public String getPets() {
//    	try {
//			URL url = new URL("https://api.rescuegroups.org/v5/public/animals/search/available/cats/haspic?fields[cats]=distance&include=breeds,locations&sort=random&limit=1");
////			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
////            conn.setRequestMethod("GET");
////            conn.connect();
//			System.out.println(url);
//		} catch (MalformedURLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return "pets";
//    
//    	}
    }
