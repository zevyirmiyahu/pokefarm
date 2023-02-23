package com.pokefarm.app.services;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokefarm.app.beans.Pokemon;
import com.pokefarm.app.beans.User;
import com.pokefarm.app.constants.PokeAppConstants.JSON_KEYS;

/**
 * Service responsible CRUD operations on the user.
 * created account.
 * @author Zev Yirmiyahu
 *
 */
@Service
public class UserService {
	
	public User createUser(final JsonNode userJsonNode) throws JsonMappingException, JsonProcessingException {
		User user = convertJsonNodeToUserObject(userJsonNode);
		String userId = generateUserId();
		user.setUserId(userId);
		
		final boolean isCreationSuccess = saveUser();
		if (isCreationSuccess) {
			// Change userId from initial to correct generated Id
			return user;
		} else {
			// to something for failure
			return null;
		}
	}
	
	public User updateUser(final JsonNode userField) {
		System.out.println(userField);
		// update in database
		return null;
	}
	
	private User convertJsonNodeToUserObject(final JsonNode userJsonNode) throws JsonMappingException, JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		String userJson = mapper.writeValueAsString(userJsonNode);
		
		return mapper.readValue(userJson, User.class);
	}
	
	/**
	 * Generates a user Id to assign to account
	 * @return userId
	 */
	private String generateUserId() {
		final SecureRandom secureRandom = new SecureRandom(); // Thread safe
		final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); // Thread safe
		byte[] randomBytes = new byte[24];
	    secureRandom.nextBytes(randomBytes);
	    
	    return base64Encoder.encodeToString(randomBytes);
	}
	
	// Responsible for saving to database
	private boolean saveUser() {
		boolean isSuccess = true;
		
		return isSuccess;
	}
	
	// Builds user data to hand back
	private JSONObject buildJsonResponse(final String userId, final String username, final String email, final List<Pokemon> pokemons) {
		JSONObject jsonResponse = new JSONObject();
		jsonResponse.put(JSON_KEYS.USER_ID, userId);
		jsonResponse.put(JSON_KEYS.USER_NAME, username);
		jsonResponse.put(JSON_KEYS.EMAIL, email);
		jsonResponse.put(JSON_KEYS.POKEMONS, pokemons);
		
		return jsonResponse;
	}
	
}
