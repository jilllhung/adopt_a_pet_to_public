package com.team.adopt_a_pet.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pets")
public class PetModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotNull
	private String name;
	private String description;
	private Double longitude;
	private Double latitude;
    private String city;
    private String state;
    private String postalCode;
    private String ageGroup;
    private String ageString;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date birthDate;
    private Boolean isBirthDateExact;
    private String breedString;
    private String breedPrimary;
//    "breedPrimaryId": 24,
    private Boolean isBreedMixed;
    private String coatLength;
	
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
    public PetModel() {
    }
}
