package com.team.adopt_a_pet.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "breeds")
public class Breed {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotNull
	private String name;
	
    @OneToMany(mappedBy="breedprimary", fetch = FetchType.LAZY)
    private List<Pet> primaryBreedPets;
    @OneToMany(mappedBy="breedsecondary", fetch = FetchType.LAZY)
    private List<Pet> secondaryBreedPets;
	
	// This will not allow the createdAt column to be updated after creation
    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    
    //runs the method(get dates) right before the object is created
    @PrePersist 
    protected void onCreate(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
	//runs a method when the object is modified
    @PreUpdate
    protected void onUpdate(){
    	this.updatedAt = new Date();
    }
    
    //Empty Constructor
    public Breed() {
    }
    
    //Getters and Setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public List<Pet> getPrimaryBreedPets() {
		return primaryBreedPets;
	}
	public void setPrimaryBreedPets(List<Pet> primaryBreedPets) {
		this.primaryBreedPets = primaryBreedPets;
	}
	public List<Pet> getSecondaryBreedPets() {
		return secondaryBreedPets;
	}
	public void setSecondaryBreedPets(List<Pet> secondaryBreedPets) {
		this.secondaryBreedPets = secondaryBreedPets;
	}
    
}
