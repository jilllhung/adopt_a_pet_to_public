package com.team.adopt_a_pet.services;

import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.repositories.PetRepository;

@Service
public class PetService {
	public final PetRepository petRepo;
	
	public PetService(PetRepository petRepo) {
		this.petRepo = petRepo;
	}
}
