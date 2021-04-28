package com.team.adopt_a_pet.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team.adopt_a_pet.services.PetService;


@RestController
public class MainController {
	public final PetService mainServ;
	public MainController(PetService mainServ) {
		this.mainServ = mainServ;
	}

	@GetMapping("/all_pets")
	public String allPets() {
		return "all_pets.jsp";
	}
	
	@GetMapping("/specific_pet")
	public String specificPet() {
		return "specific_pet.jsp";
	}
}