package com.pokefarm.app.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.serialization.Serialization;

public interface UserService {
	
	public User createUser(final JsonNode userJsonNode) throws UserCreationException;
	
	public void saveUser(User user, final Serialization serialization);
	
	public void saveUserToDatabase(final User user);
	
	public User updateUser(final JsonNode userField);
	
	public User loadUser(final String username, final String password, final Serialization serialization);
}
