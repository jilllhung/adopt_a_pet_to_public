package com.team.adopt_a_pet.controllers;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.team.adopt_a_pet.services.PetService;

@Controller
public class MainController {
	public final PetService mainServ;
	public MainController(PetService mainServ) {
		this.mainServ = mainServ;
	}
	
	@GetMapping("/all_pets")
	public String getAllPets() {
		try {
			URL url = new URL("https://api.rescuegroups.org/v5/public/animals/search/available/cats/haspic?fields[cats]=distance&include=breeds,locations&sort=random&limit=1");
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("GET");
//            conn.connect();
			System.out.println(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Pets";
	}
	
	@GetMapping("/specific_pet")
	public String specificPet() {
		return "specific_pet.jsp";
	}
}