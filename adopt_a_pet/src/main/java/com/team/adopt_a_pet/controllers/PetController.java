package com.team.adopt_a_pet.controllers;


import java.util.ArrayList;
import java.util.List;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.adopt_a_pet.models.Test;

@RestController //parses object and turns into json for you and then sends it off.
public class PetController {
	
	@RequestMapping("/getpets") 
	
//	public Test getPets() {
//		Test test = new Test();
//		test.setName("hello");
//				return test;
		//grab object data and convert to json
		// return json object as a string
	//}
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
