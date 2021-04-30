package com.team.adopt_a_pet.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.team.adopt_a_pet.models.Organization;

@Repository
public interface OrganizationRepository extends CrudRepository<Organization, Long> {
	List<Organization> findAll();
	Organization findByNameAndPostalcode(String name, String postalcode);
}
