package com.team.adopt_a_pet.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.Breed;
import com.team.adopt_a_pet.models.Species;
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
	
	//Add dummy breeds manually
	public void addDummyBreeds() {
		Species s1=new Species();
		s1.setId((long)1);
		Species s2=new Species();
		s2.setId((long)2);
		Breed breed1 = new Breed();
		breed1.setName("Domestic Short Hair");
		breed1.setSpecies(s2);
		breedRepo.save(breed1);
		Breed breed2 = new Breed();
		breed2.setName("Domestic Long Hair");
		breed2.setSpecies(s2);
		breedRepo.save(breed2);
		Breed breed3 = new Breed();
		breed3.setName("Golden Retriever");
		breed3.setSpecies(s1);
		breedRepo.save(breed3);
		Breed breed4 = new Breed();
		breed4.setName("Corgy");
		breed4.setSpecies(s1);
		breedRepo.save(breed4);
	}
	public List<Breed> getBreedsOfSpecies(Species s) {
		return breedRepo.findBySpecies(s);
	}
	
	//parse json string from rescue api for breed
	public void parseBreed(String breeds) {
//		String breeds = "{\r\n"
//				+ "    \"meta\": {\r\n"
//				+ "        \"count\": 77,\r\n"
//				+ "        \"countReturned\": 77,\r\n"
//				+ "        \"pageReturned\": 1,\r\n"
//				+ "        \"pages\": 1,\r\n"
//				+ "        \"limit\": 77,\r\n"
//				+ "        \"transactionId\": \"yfopMRiAUDFr\"\r\n"
//				+ "    },\r\n"
//				+ "    \"data\": [\r\n"
//				+ "        {\r\n"
//				+ "            \"type\": \"breeds\",\r\n"
//				+ "            \"id\": \"1\",\r\n"
//				+ "            \"attributes\": {\r\n"
//				+ "                \"name\": \"Abyssinian\"\r\n"
//				+ "            }\r\n"
//				+ "        },\r\n"
//				+ "        {\r\n"
//				+ "            \"type\": \"breeds\",\r\n"
//				+ "            \"id\": \"2\",\r\n"
//				+ "            \"attributes\": {\r\n"
//				+ "                \"name\": \"American Curl\"\r\n"
//				+ "            }\r\n"
//				+ "        },";
		String[] arrayBreed = breeds.split("name\": \"");
//		List<String> rawBreeds = new ArrayList<String>();
//		rawBreeds = Arrays.asList(arrayBreed);
		int indexOfFirstQuote = 0;
		for(int i=1; i<arrayBreed.length; i++) {
			indexOfFirstQuote = arrayBreed[i].indexOf("\"");
			arrayBreed[i] = arrayBreed[i].substring(0, indexOfFirstQuote);
			//add to database
			Breed toBeAdded = new Breed(arrayBreed[i]);
			this.createBreed(toBeAdded);
		}
	}
}
