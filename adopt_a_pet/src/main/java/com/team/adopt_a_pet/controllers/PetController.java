package com.team.adopt_a_pet.controllers;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.RequestBodySpec;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersSpec;
import org.springframework.web.reactive.function.client.WebClient.UriSpec;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.adopt_a_pet.Exceptions.BadRequestException;
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

import reactor.core.publisher.Mono;

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
	
//	//Get All Pets
//	@RequestMapping("/pets/all")
//	public List<Pet> getPets(){
//		return petServ.getAllPets();
//	}
	//Get Specific Pet By ID
	@RequestMapping("/pets/show/{pid}")
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
	//Get All Pets of a Specific Species
	@GetMapping("/pets/{spec}")
	public List<Pet> getAllPetsOfSpecies(@PathVariable String spec){
		List<Pet> s=new ArrayList<>();
		if(spec.equals("all")) {
			s=petServ.getAllPets();
		}
		else {
			s=petServ.getPetsBySpeciesName(spec);
		}
		return s;
	}
	
	//Get All Breeds of a Specific Species
	@RequestMapping("/breeds/species/{sp_name}")
	public List<Breed> getBreedsBySpecies(@PathVariable String sp_name){
		return breedServ.getBreedsOfSpecies(sp_name);
	}
	//Create new Pet
	@PostMapping("/pets/new")
	public Pet createPet(@RequestBody Pet p,HttpServletResponse response) throws BadRequestException {
		Pet x=mkPet(p);
//		if(x instanceof Pet)
//			return (Pet)x;
//		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		return x;
	}
//inspectPetandCreate
public Pet mkPet(Pet p) throws BadRequestException{
	//ck name, contact(email/#/org), species
    Pet x=null;
    DataBinder binder=new DataBinder(p);
    binder.setValidator(validator);
    binder.validate();
    BindingResult res=binder.getBindingResult();
    if(!res.hasErrors()) { //below trying to figure out why data that is coming back is null
        x=petServ.saveAndFlushPet(p);
        x=petServ.getPet(x.getId());
//			System.out.println(x);
    }
    else {
        System.out.println("Error");
        System.out.println(res.getAllErrors());
//			System.out.println(p);
//        ObjectMapper EMapper=new ObjectMapper();
//        try {
//			System.out.println(EMapper.writeValueAsString(res.getAllErrors()));
		throw new BadRequestException(res.getAllErrors());
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    }
    return x;
}
	//inspectBreedandCreate
	public Breed mkBreed(Breed b){
		Breed x=null;
		DataBinder binder=new DataBinder(b);
		binder.setValidator(validator);
		binder.validate();
		BindingResult res=binder.getBindingResult();
		String n=b.getName();
		Species spec=b.getSpecies();
		Breed y=breedServ.getBreedByNameAndSpecies(n,spec);
		boolean z=((y==null)||b.getSpecies().getId()!=y.getSpecies().getId());
		if(!res.hasErrors()&&z) { //below trying to figure out why data that is coming back is null
			x=breedServ.createBreed(b);
//			x=petServ.getPet(x.getId());
//				System.out.println(x);
		}
		else {
			System.out.println("Error");
			System.out.println(res.getAllErrors());
//				System.out.println(p);
		}
		return x;
	}
	
	public Organization mkOrg(Organization org){
		Organization x=null;
		DataBinder binder=new DataBinder(org);
		binder.setValidator(validator);
		binder.validate();
		BindingResult res=binder.getBindingResult();
		String nofOrg=org.getName();
		String pofOrg=org.getPostalcode();
		Organization thisOrg = orgServ.getOrganization(nofOrg, pofOrg);

		boolean z=((thisOrg==null));
		if(!res.hasErrors()&&z) {
			x=orgServ.createOrganization(org);

		}
		else {
			System.out.println("Error");
			System.out.println(res.getAllErrors());
//				System.out.println(p);
		}
		return x;
	}
	
	@RequestMapping("/breeds/load")
	public Boolean loadBreeds() {
//		loadCatBreed();
//		loadDogBreed();
		JacksonTesting((long) 2, "cats" );
		JacksonTesting((long) 1, "dogs" );
		return true;
	}
	public Boolean loadCatBreed(){
		try {
			String urlString="https://api.rescuegroups.org/v5/public/animals/breeds/search/cats/";
			URL url = new URL(urlString);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Authorization", APIKey);
			con.setConnectTimeout(5000);
			con.setReadTimeout(5000);
			con.setInstanceFollowRedirects(false);
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
			    content.append(inputLine);
			}
			String requestResults=content.toString();
			System.out.println(requestResults);
			in.close();
			con.disconnect();
			Pattern pattern = Pattern.compile("\"count\":[0-9]+");
			Matcher matcher = pattern.matcher(requestResults);
			String limit="";
			if (matcher.find()) {
				limit=matcher.group(0);
			}
			limit=limit.split(":")[1];
			
			urlString="https://api.rescuegroups.org/v5/public/animals/breeds/search/cats/?limit="+limit;
			url=new URL(urlString);
			con=(HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Authorization", APIKey);
			con.setConnectTimeout(5000);
			con.setReadTimeout(5000);
			con.setInstanceFollowRedirects(false);
			in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
			    content.append(inputLine);
			}
			requestResults=content.toString();
			String tArr=requestResults.split("\"},\"data\":")[1];
			System.out.println(tArr);
			parseBreed(tArr,(long)2);
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}
	public Boolean loadDogBreed(){
		try {
			String urlString="https://api.rescuegroups.org/v5/public/animals/breeds/search/dogs/";
			URL url = new URL(urlString);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Authorization", APIKey);
			con.setConnectTimeout(5000);
			con.setReadTimeout(5000);
			con.setInstanceFollowRedirects(false);
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
			    content.append(inputLine);
			}
			String requestResults=content.toString();
			System.out.println(requestResults);
			in.close();
			con.disconnect();
			Pattern pattern = Pattern.compile("\"count\":[0-9]+");
			Matcher matcher = pattern.matcher(requestResults);
			String limit="";
			if (matcher.find()) {
				limit=matcher.group(0);
			}
			limit=limit.split(":")[1];
			
			urlString="https://api.rescuegroups.org/v5/public/animals/breeds/search/dogs/?limit="+limit;
			url=new URL(urlString);
			con=(HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Authorization", APIKey);
			con.setConnectTimeout(5000);
			con.setReadTimeout(5000);
			con.setInstanceFollowRedirects(false);
			in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
			    content.append(inputLine);
			}
			requestResults=content.toString();
			String tArr=requestResults.split("\"},\"data\":")[1];
			System.out.println(tArr);
			parseBreed(tArr,(long)1);
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}
	//parse json string from rescue api for breed
	public void parseBreed(String breeds,Long sp_id) {
		String[] arrayBreed = breeds.split("name\":\"");
		System.out.println(arrayBreed.length);
		int indexOfFirstQuote = 0;
		Species s=speciesServ.getSpecies(sp_id);
		for(int i=1; i<arrayBreed.length; i++) {
			indexOfFirstQuote = arrayBreed[i].indexOf('"');
			arrayBreed[i] = arrayBreed[i].substring(0, indexOfFirstQuote);
			System.out.println(arrayBreed[i]);
//			//add to database
			Breed toBeAdded = new Breed(arrayBreed[i]);
			toBeAdded.setSpecies(s);
			mkBreed(toBeAdded);
		}
	}
	
	public void JacksonTesting(Long sp_id, String species) {
		WebClient w=WebClient.builder()
				.baseUrl("https://api.rescuegroups.org")
				.defaultHeader(HttpHeaders.AUTHORIZATION, APIKey) 
				.build();
		UriSpec<RequestBodySpec> uriSpec = w.method(HttpMethod.GET);
		RequestBodySpec bodySpec = uriSpec.uri("/v5/public/animals/breeds/search/"+species);
		RequestHeadersSpec<?> headersSpec = bodySpec.bodyValue("");
		Mono<String> response=headersSpec.exchangeToMono(r -> {
			  if (r.statusCode()
					    .equals(HttpStatus.OK)) {
					      return r.bodyToMono(String.class);
					  } else if (r.statusCode()
					    .is4xxClientError()) {
						  System.out.println(r.statusCode());
					      return Mono.just("Error response");
					  } else {
						  return r.createException()
					        .flatMap(Mono::error);
					  }
		});
		String body=response.block();
		System.out.println(body);
		ObjectMapper Layer1=new ObjectMapper();
		JsonNode root;
		try {
			root=Layer1.readTree(body);
			System.out.println(root);
			JsonNode name=root.path("meta").path("count");
			System.out.println(name);
			bodySpec = uriSpec.uri("/v5/public/animals/breeds/search/"+species+"/?limit="+name);
			headersSpec = bodySpec.bodyValue("");
			response=headersSpec.exchangeToMono(r -> {
				  if (r.statusCode()
						    .equals(HttpStatus.OK)) {
						      return r.bodyToMono(String.class);
						  } else if (r.statusCode()
						    .is4xxClientError()) {
							  System.out.println(r.statusCode());
						      return Mono.just("Error response");
						  } else {
						      return r.createException()
						        .flatMap(Mono::error);
						  }
			});
			body=response.block();
			System.out.println(body);
			root=Layer1.readTree(body);
			name=root.path("data");
			System.out.println(name);
			Species sp=speciesServ.getSpecies(sp_id);
			for(JsonNode s:name) {
				System.out.println(s.get("attributes").get("name").asText());
				Breed toBeAdded = new Breed(s.get("attributes").get("name").asText());
				toBeAdded.setSpecies(sp);
				mkBreed(toBeAdded);
			}
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping("/orgs/load")
	public Boolean loadOrgs() {
		JacksonOrganization();
		return true;
	}
	public void JacksonOrganization() {
		WebClient w=WebClient.builder()
				.baseUrl("https://api.rescuegroups.org")
				.defaultHeader(HttpHeaders.AUTHORIZATION, APIKey) 
				.build();
		UriSpec<RequestBodySpec> uriSpec = w.method(HttpMethod.GET);
		RequestBodySpec bodySpec = uriSpec.uri("v5/public/orgs/search/?sort=orgs.distance");
		RequestHeadersSpec<?> headersSpec = bodySpec.bodyValue("{\"data\":{\"filters\":[],\"filterProcessing\":\"1\",\"filterRadius\":{\"miles\":20,\"postalcode\":\"98109\"}}}");
		Mono<String> response=headersSpec.exchangeToMono(r -> {
			  if (r.statusCode()
					    .equals(HttpStatus.OK)) {
					      return r.bodyToMono(String.class);
					  } else if (r.statusCode()
					    .is4xxClientError()) {
						  System.out.println(r.statusCode());
					      return Mono.just("Error response");
					  } else {
						  return r.createException()
					        .flatMap(Mono::error);
					  }
		});
		String body=response.block();
		System.out.println(body);
		ObjectMapper Layer1=new ObjectMapper();
		JsonNode root;
		try {
			root=Layer1.readTree(body);
			System.out.println(root);
			JsonNode name=root.path("meta").path("count");
//			System.out.println(name);
			bodySpec = uriSpec.uri("v5/public/orgs/search/?sort=orgs.distance&limit="+name);
			headersSpec = bodySpec.bodyValue("{\"data\":{\"filters\":[],\"filterProcessing\":\"1\",\"filterRadius\":{\"miles\":20,\"postalcode\":\"98109\"}}}");
			response=headersSpec.exchangeToMono(r -> {
				  if (r.statusCode()
						    .equals(HttpStatus.OK)) {
						      return r.bodyToMono(String.class);
						  } else if (r.statusCode()
						    .is4xxClientError()) {
							  System.out.println(r.statusCode());
						      return Mono.just("Error response");
						  } else {
						      return r.createException()
						        .flatMap(Mono::error);
						  }
			});
			body=response.block();
			System.out.println(body);
			root=Layer1.readTree(body);
			name=root.path("data");
			for(JsonNode s:name) {
				Organization newOrg = Layer1.convertValue(s.get("attributes"), Organization.class);
				System.out.println(newOrg);
				mkOrg(newOrg);
			}
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
	@RequestMapping("/pets/load")
	public Boolean loadPets() {
		JacksonPet();
		return true;
	}
	public void JacksonPet() {
		WebClient w=WebClient.builder()
				.baseUrl("https://api.rescuegroups.org")
				.defaultHeader(HttpHeaders.AUTHORIZATION, APIKey) 
				.build();
		UriSpec<RequestBodySpec> uriSpec = w.method(HttpMethod.GET);
//		 MAX_VALUE (2147483647) of System.out.println
		RequestBodySpec bodySpec = uriSpec.uri("v5/public/animals/search/available?sort=animals.id&limit=1&include=breeds");
		RequestHeadersSpec<?> headersSpec = bodySpec.bodyValue("{\"data\":{\"filterRadius\":{\"miles\": 20,\"postalcode\":98109}}}");
		Mono<String> response=headersSpec.exchangeToMono(r -> {
			  if (r.statusCode()
					    .equals(HttpStatus.OK)) {
					      return r.bodyToMono(String.class);
					  } else if (r.statusCode()
					    .is4xxClientError()) {
						  System.out.println(r.statusCode());
					      return Mono.just("Error response");
					  } else {
						  return r.createException()
					        .flatMap(Mono::error);
					  }
		});
		String body=response.block();
//		System.out.println(body);
		ObjectMapper Layer1=new ObjectMapper();
		JsonNode root;
		try {
			root=Layer1.readTree(body);
			JsonNode name=root.path("meta").path("count");
			System.out.println(name);
			int limit = 25;
			int total = name.asInt();
			int totalPages = (int) Math.ceil(total/(float) limit);
			System.out.println(totalPages);
			for (int i=1; i<=totalPages; i++) {
				bodySpec = uriSpec.uri("v5/public/animals/search/available?sort=animals.id&include=orgs,species&limit="+ limit +"&page=" + i);
				headersSpec = bodySpec.bodyValue(
						"{\"data\":{\"filterRadius\":{\"miles\": 20,\"postalcode\":98109}}}");
				response = headersSpec.exchangeToMono(r -> {
					if (r.statusCode().equals(HttpStatus.OK)) {
						return r.bodyToMono(String.class);
					} else if (r.statusCode().is4xxClientError()) {
						System.out.println(r.statusCode());
						return Mono.just("Error response");
					} else {
						return r.createException().flatMap(Mono::error);
					}
				});
				body = response.block();
//				System.out.println(body);
				root = Layer1.readTree(body);
				name = root.path("data");
				JsonNode includedMess = root.path("included");
				//Map out org, species w/ their ids
				Species Other = speciesServ.getSpecificSpecies("other");
				HashMap<String, Organization> orgMap = new HashMap<>();
				HashMap<String, Species> speciesMap = new HashMap<>();
				for(JsonNode include: includedMess) {
					String key = include.path("id").asText();
					JsonNode att = include.path("attributes");
					if(include.path("type").asText().equals("orgs")) {
						Organization foundOrg = orgServ.getOrganization(att.path("name").asText(), att.path("postalcode").asText());
//						System.out.println(foundOrg);
						if(foundOrg==null) {
//							System.out.println(att.path("name").asText());
							String LAS=att.path("lat").asText();
							String LOS=att.path("lon").asText();
							if(LAS.charAt(0)=='-')
								LAS=LAS.substring(0, 8);
							else
								LAS=LAS.substring(0, 7);
							if(LOS.charAt(0)=='-')
								LOS=LOS.substring(0, 8);
							else
								LOS=LOS.substring(0, 7);
//							System.out.println(LAS);
//							System.out.println(LOS);
//							System.out.println(orgServ.getOrganization((long)6).getLat());
//							System.out.println(orgServ.getOrganization((long)6).getLon());
							foundOrg = orgServ.getOrganization(att.path("name").asText(), Double.parseDouble(LAS), Double.parseDouble(LOS) );
//							System.out.println(foundOrg);
						}
						if(foundOrg==null) {
							foundOrg = orgServ.getOrganization(att.path("name").asText(),att.path("city").asText(),att.path("state").asText(),att.path("url").asText());
//							System.out.println(foundOrg);
						}
						orgMap.put(key, foundOrg);
					}else { //"species"
						Species foundSp = speciesServ.getSpecificSpecies(att.path("singular").asText().toLowerCase());
						speciesMap.put(key, foundSp);
					}
				}
				for (JsonNode s : name) {
//					System.out.println(s);
					Pet newPet = Layer1.convertValue(s.get("attributes"), Pet.class);
					System.out.println(newPet);
					newPet.setDescription(s.path("attributes").path("descriptionText").asText());
					if (newPet.getDescription() != null) {
						newPet.setDescription(s.path("attributes").path("descriptionHtml").asText());
					}
					//Set Relationships
					//AgeGroup
					String age = s.path("attributes").path("ageGroup").asText();
					AgeGroup thisAge = ageGroupServ.getAgeGroupByName(age);
					System.out.println(age);
					System.out.println(thisAge);
					newPet.setAgeGrp(thisAge);
//					System.out.println(s.path("relationships").path("orgs").path("data").path(0));
					String orgAPIid = s.path("relationships").path("orgs").path("data").path(0).path("id").asText();
					String speciesAPIid = s.path("relationships").path("species").path("data").path(0).path("id").asText();
//					System.out.println(orgAPIid);
//					System.out.println(orgMap.get(orgAPIid));
					newPet.setOrganization(orgMap.get(orgAPIid));
					newPet.setLatitude(orgMap.get(orgAPIid).getLat());
					newPet.setLongitude(orgMap.get(orgAPIid).getLon());
					newPet.setPostalCode(orgMap.get(orgAPIid).getPostalcode());
					newPet.setCity(orgMap.get(orgAPIid).getCity());
					newPet.setState(orgMap.get(orgAPIid).getState().toUpperCase());
					newPet.setSpecies(speciesMap.get(speciesAPIid));
					if(newPet.getSpecies()==null) {
						newPet.setSpecies(Other);
					}
					System.out.println(newPet.getSpecies());
					newPet.setBreedPrimary(breedServ.getBreedByNameAndSpecies(s.path("attributes").path("breedPrimary").asText(), speciesMap.get(speciesAPIid)));
					if (s.path("attributes").path("breedSecondary") != null) {
						newPet.setBreedSecondary(breedServ.getBreedByNameAndSpecies(s.path("attributes").path("breedSecondary").asText(), speciesMap.get(speciesAPIid)));
					}
					System.out.println(newPet);
					try {
						mkPet(newPet);
					}
					catch (Exception e) {
						System.out.println("Bad Data");
					}
				}
			}
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
//	private class ErrorData extends Throwable{
//		private List<ObjectError> data=new ArrayList<>();
//		public ErrorData(List<ObjectError> errors) {
//			this.data=errors;
//		}
//	}
	
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