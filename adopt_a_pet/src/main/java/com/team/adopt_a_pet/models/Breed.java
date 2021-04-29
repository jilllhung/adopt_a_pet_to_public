package com.team.adopt_a_pet.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "breeds")
public class Breed {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotBlank
	private String name;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="species_id")
	private Species species;
	
	@JsonIgnore
    @OneToMany(mappedBy="breedPrimary", fetch = FetchType.LAZY)
    private List<Pet> primaryBreedPets;
	@JsonIgnore
    @OneToMany(mappedBy="breedSecondary", fetch = FetchType.LAZY)
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
    
    @Override
    public boolean equals(Object o) {
    	if(o == null) return false;
    	if(o == this) return true;
    	if(o instanceof Breed) {
    		Breed b = (Breed) o;
    		return b.getName().equals(this.name) && b.getSpecies().equals(this.species);
    	}
    	return false;
    }
    @Override
    public int hashCode() {
    	return name.hashCode() * species.hashCode();
    }
    @Override
    public String toString() {
    	return String.format("Breed{id: %d|name: %s|species: %s}", id, name, species.toString());
    }
    
    //Empty Constructor
    public Breed() {
    }
    public Breed(String name) {
    	this.name = name;
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
	public Species getSpecies() {
		return species;
	}
	public void setSpecies(Species species) {
		this.species = species;
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
