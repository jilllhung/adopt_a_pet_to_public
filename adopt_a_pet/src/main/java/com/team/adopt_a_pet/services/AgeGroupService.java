package com.team.adopt_a_pet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.AgeGroup;
import com.team.adopt_a_pet.repositories.AgeGroupRepository;

@Service
public class AgeGroupService {
	@Autowired
	private AgeGroupRepository ageGroupRepo;
	
	//create or update
	public AgeGroup createAgeGroup(AgeGroup ageGroup) {
		return ageGroupRepo.save(ageGroup);
	}
	//retrieve all
	public List<AgeGroup> getAllAgeGroups(){
		return ageGroupRepo.findAll();
	}
	//retrieve a ageGroup
	public AgeGroup getAgeGroup(Long id) {
		Optional<AgeGroup> optionalAgeGroup = ageGroupRepo.findById(id);
		return optionalAgeGroup.orElse(null);
	}
	//delete a ageGroup
	public void deleteAgeGroup(Long id) {
		ageGroupRepo.deleteById(id);
	}
	
	//Manually Add Dummy AgeGroups
	public void addDummyAgeGroups() {
		AgeGroup ageGroup1 = new AgeGroup();
		ageGroup1.setName("Young");
		AgeGroup ageGroup2 = new AgeGroup();
		ageGroup2.setName("Adult");
		AgeGroup ageGroup3 = new AgeGroup();
		ageGroup3.setName("Senior");
	}
}
