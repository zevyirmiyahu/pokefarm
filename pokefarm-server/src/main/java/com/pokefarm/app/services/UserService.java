package com.pokefarm.app.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.models.UserEntity;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.serialization.Serialization;

public interface UserService {
	
	public User createUser(final JsonNode userJsonNode) throws UserCreationException;
	
	/**
	 * Save/update user data using serialization
	 * @param user
	 * @param serialization
	 */
	public void saveUser(User user, final Serialization serialization);
	
	/**
	 * Saves/updates user to database
	 * @param user
	 */
	public UserEntity saveUserToDatabase(final User user);
	
	public User loadUser(final String username, final String password, final Serialization serialization);
}
