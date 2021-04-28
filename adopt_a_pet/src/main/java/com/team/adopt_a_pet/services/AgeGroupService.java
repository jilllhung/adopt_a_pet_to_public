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
	//retrieve a ageGroup by id
	public AgeGroup getAgeGroup(Long id) {
		Optional<AgeGroup> optionalAgeGroup = ageGroupRepo.findById(id);
		return optionalAgeGroup.orElse(null);
	}
	//retrieve a ageGroup by name
	public AgeGroup getAgeGroupByName(String name) {
		AgeGroup listAgeGroup = ageGroupRepo.findByName(name);
		return listAgeGroup;
	}
	//delete a ageGroup
	public void deleteAgeGroup(Long id) {
		ageGroupRepo.deleteById(id);
	}
	
	//Manually Add Dummy AgeGroups
	public void addDummyAgeGroups() {
		AgeGroup ageGroup1 = new AgeGroup();
		ageGroup1.setName("Young");
		ageGroupRepo.save(ageGroup1);
		AgeGroup ageGroup2 = new AgeGroup();
		ageGroup2.setName("Adult");
		ageGroupRepo.save(ageGroup2);
		AgeGroup ageGroup3 = new AgeGroup();
		ageGroup3.setName("Senior");
		ageGroupRepo.save(ageGroup3);
	}
}
