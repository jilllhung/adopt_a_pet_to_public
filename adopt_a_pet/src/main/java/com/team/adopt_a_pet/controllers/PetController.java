package com.team.adopt_a_pet.controllers;


import java.util.ArrayList;
import java.util.List;

import javax.naming.Binding;
import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
	@Autowired
	private Validator validator;
	
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
	
	@RequestMapping("/dummy/all")
	public List<Pet> createDummiesToDataBase() {
		orgServ.addDummyOrg();
		speciesServ.addDummySpecies();
		ageGroupServ.addDummyAgeGroups();
		breedServ.addDummyBreeds();
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
		Pet x=petServ.getPet(pid);
		System.out.println(x);
		return x;
	}
	//Get All Pets of a Specific AgeGroup
	@RequestMapping("/pets/agegroup/{age}")
	public List<Pet> getAllPetsOfAgeGroup(@PathVariable String age){
		AgeGroup thisAgeGroup = ageGroupServ.getAgeGroupByName(age);
		return thisAgeGroup.getPets();
	}
	//Create new Pet
	@PostMapping("/pets/new")
	public Pet createPet(@RequestBody Pet p) throws ResponseStatusException{
		Pet x=mkPet(p);
		x=petServ.getPet(x.getId());
		return x;
	}
	public Pet mkPet(Pet p){
		Pet x=null;
		DataBinder binder=new DataBinder(p);
		binder.setValidator(validator);
		binder.validate();
		BindingResult res=binder.getBindingResult();
		if(!res.hasErrors()) {
			x=petServ.createPet(p);
			x=petServ.getPet(x.getId());
			System.out.println(x);
		}
		else {
			System.out.println("Error");
			System.out.println(res.getAllErrors());
			System.out.println(p);
		}
		return x;
	}
	
	@RequestMapping("/breeds/species/{sp_id}")
	public List<Breed> getBreedsBySpecies(@PathVariable Species sp_id){
		return breedServ.getBreedsOfSpecies(sp_id);
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
