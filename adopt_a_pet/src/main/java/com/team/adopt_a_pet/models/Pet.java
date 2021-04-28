package com.team.adopt_a_pet.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pets")
public class Pet {
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
    // Many To One Relationship w/ AgeGroup
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="agegroup_id")
    private AgeGroup ageGroup;
    private String ageString;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date birthDate;
    private Boolean isBirthDateExact;
    private String breedString;
    // Two Many To One Relationship w/ Breed
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="breedprimary_id")
    private Breed breedPrimary;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="breedsecondary_id")
    private Breed breedSecondary;
//    "breedPrimaryId": 24,
    private Boolean isBreedMixed;
    private String coatLength;
    private String descriptionText;
//    private Integer pictureCount;
    private String pictureThumbnailUrl;
    private String rescueId;
    private String sex;
    private String sizeGroup;
    private String slug;
    private String trackerimageUrl;
    // One To Many Relationship w/ Organization
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="organization_id")
    private Organization organization;
    // One To Many Relationship w/ Species
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="species_id")
    private Species species;


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
    public Pet() {
    }
    
    public Pet(String name, String description, 
    		String city, String state, String postalCode, String pictureThumbnailUrl) {
    	this.name = name;
    	this.description = description;
    	this.city = city;
    	this.state = state;
    	this.postalCode = postalCode;
//    	this.ageString = ageString;
    	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getLongitude() {
		return longitude;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	public Double getLatitude() {
		return latitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getAgeString() {
		return ageString;
	}
	public void setAgeString(String ageString) {
		this.ageString = ageString;
	}
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	public Boolean getIsBirthDateExact() {
		return isBirthDateExact;
	}
	public void setIsBirthDateExact(Boolean isBirthDateExact) {
		this.isBirthDateExact = isBirthDateExact;
	}
	public String getBreedString() {
		return breedString;
	}
	public void setBreedString(String breedString) {
		this.breedString = breedString;
	}
	public Breed getBreedPrimary() {
		return breedPrimary;
	}
	public void setBreedPrimary(Breed breedPrimary) {
		this.breedPrimary = breedPrimary;
	}
	public Boolean getIsBreedMixed() {
		return isBreedMixed;
	}
	public void setIsBreedMixed(Boolean isBreedMixed) {
		this.isBreedMixed = isBreedMixed;
	}
	public String getCoatLength() {
		return coatLength;
	}
	public void setCoatLength(String coatLength) {
		this.coatLength = coatLength;
	}
	public String getDescriptionText() {
		return descriptionText;
	}
	public void setDescriptionText(String descriptionText) {
		this.descriptionText = descriptionText;
	}
	public String getPictureThumbnailUrl() {
		return pictureThumbnailUrl;
	}
	public void setPictureThumbnailUrl(String pictureThumbnailUrl) {
		this.pictureThumbnailUrl = pictureThumbnailUrl;
	}
	public String getRescueId() {
		return rescueId;
	}
	public void setRescueId(String rescueId) {
		this.rescueId = rescueId;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getSizeGroup() {
		return sizeGroup;
	}
	public void setSizeGroup(String sizeGroup) {
		this.sizeGroup = sizeGroup;
	}
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
	public String getTrackerimageUrl() {
		return trackerimageUrl;
	}
	public void setTrackerimageUrl(String trackerimageUrl) {
		this.trackerimageUrl = trackerimageUrl;
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
	public AgeGroup getAgeGroup() {
		return ageGroup;
	}
	public void setAgeGroup(AgeGroup ageGroup) {
		this.ageGroup = ageGroup;
	}
	public Breed getBreedSecondary() {
		return breedSecondary;
	}
	public void setBreedSecondary(Breed breedSecondary) {
		this.breedSecondary = breedSecondary;
	}
	public Organization getOrganization() {
		return organization;
	}
	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
	public Species getSpecies() {
		return species;
	}
	public void setSpecies(Species species) {
		this.species = species;
	}
}
