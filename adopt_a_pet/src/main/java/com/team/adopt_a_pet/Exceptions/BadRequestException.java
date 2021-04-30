package com.team.adopt_a_pet.Exceptions;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.server.ResponseStatusException;

public class BadRequestException extends RuntimeException {
	private List<ObjectError> data; 
	public BadRequestException(List<ObjectError> data) {
		super();
		this.data=data;
		// TODO Auto-generated constructor stub
	}
    // constructors
	public List<ObjectError> getData() {
		return data;
	}
	public void setData(List<ObjectError> data) {
		this.data = data;
	}
	
}
