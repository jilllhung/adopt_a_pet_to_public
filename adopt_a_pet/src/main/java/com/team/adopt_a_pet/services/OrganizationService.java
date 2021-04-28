package com.team.adopt_a_pet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.adopt_a_pet.models.Organization;
import com.team.adopt_a_pet.repositories.OrganizationRepository;

@Service
public class OrganizationService {
	@Autowired
	private OrganizationRepository organizationRepo;
	
	//create or update
	public Organization createOrganization(Organization organization) {
		return organizationRepo.save(organization);
	}
	//retrieve all
	public List<Organization> getAllOrganizations(){
		return organizationRepo.findAll();
	}
	//retrieve a organization
	public Organization getOrganization(Long id) {
		Optional<Organization> optionalOrganization = organizationRepo.findById(id);
		return optionalOrganization.orElse(null);
	}
	//delete a organization
	public void deleteOrganization(Long id) {
		organizationRepo.deleteById(id);
	}
}
