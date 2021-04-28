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
	
	//add dummy organizations manually
	public void addDummyOrg() {
		Organization org1 = new Organization();
		org1.setName("Tampa Bay Beagle Rescue, Inc.");
		org1.setCity("Tampa");
		org1.setPhone("(813) 446-9663");
		org1.setPostalcode("33688");
		org1.setState("FL");
		org1.setUrl("www.tampabaybeaglerescue.org");
		org1.setLat(28.0054);
		org1.setLon(-82.4877);
		Organization org2 = new Organization();
		org2.setName("Genesis Animal Rescue");
		org2.setCity("Mattoon");
		org2.setPhone("(800) 688-7934");
		org2.setPostalcode("61938");
		org2.setState("IL");
		org2.setUrl("http://www.genesisanimalrescue.org");
		org2.setLat(39.4763);
		org2.setLon(-88.3595);
		org2.setStreet("PO Box 1985");
		org2.setEmail("info@genesisanimalrescue.org");
	}
}
