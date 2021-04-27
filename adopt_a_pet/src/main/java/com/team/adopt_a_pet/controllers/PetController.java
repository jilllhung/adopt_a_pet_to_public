package com.team.adopt_a_pet.controllers;

import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@SpringBootApplication

@RestController
public class PetController {
	public static void main(String[] args) {
		SpringApplication.run(PetController.class, args);
	}
	
	
    @RequestMapping("/getPets")
    public String getPets() {
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
		return "pets";
    
    	}
    }
