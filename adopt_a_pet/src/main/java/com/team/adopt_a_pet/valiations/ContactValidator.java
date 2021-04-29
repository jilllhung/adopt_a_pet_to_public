package com.team.adopt_a_pet.valiations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.BeanWrapperImpl;

import com.team.adopt_a_pet.models.Organization;

public class ContactValidator implements ConstraintValidator<ContactValues, Object> {
	
	private String field1;
	private String field2;
	private String field3;
	
	@Override
	public void initialize(ContactValues constraintAnnotation) {
		this.field1=constraintAnnotation.field1();
		this.field2=constraintAnnotation.field2();
		this.field3=constraintAnnotation.field3();
	}
	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		Object val1=new BeanWrapperImpl(value).getPropertyValue(field1);
		Object val2=new BeanWrapperImpl(value).getPropertyValue(field2);
		Object val3=new BeanWrapperImpl(value).getPropertyValue(field3);
		boolean x=false;
		if(val1 instanceof String||val2 instanceof String||val3 instanceof String) {
			if(!"".equals(val1)||!"".equals(val2)||!"".equals(val3))x=true;
		}
		else if(val1 instanceof Organization||val2 instanceof Organization||val3 instanceof Organization)x=true;
		return x;
	}
}
