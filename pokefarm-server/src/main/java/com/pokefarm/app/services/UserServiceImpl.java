package com.pokefarm.app.services;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.annotations.VisibleForTesting;
import com.pokefarm.app.constants.JsonConstants.JSON_KEYS;
import com.pokefarm.app.constants.UserConstants.USER;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.models.UserEntity;
import com.pokefarm.app.pojos.Pokemon;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.repositories.UserRepository;
import com.pokefarm.app.serialization.Serialization;

/**
 * Service responsible CRUD operations on the user.
 * created account.
 * @author Zev Yirmiyahu
 *
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    // TODO: Rename this to buildUser since createUser give the impression it's being saved somewhere
    // TODO: Saving of user should occur upon user creation too, implement that functionality
    @Override
	public User createUser(final JsonNode userJsonNode) throws UserCreationException {
		try {
			final User user = convertJsonNodeToUserObject(userJsonNode);
			
			// Assign Unique User Id if ID is initial
			String userId = user.getUserId();
			user.setUserId(USER.INITIAL_ID.equals(userId) ? generateUserId() : userId );
			user.setIsNewUser(false);
			return user;
		} catch (JsonProcessingException e) {
			final String errorMsg = "Error occured while processing user json";
			LOGGER.error(errorMsg, e);
			throw new UserCreationException(e);
		}
	}
	
    @Override
	public void saveUser(User user, final Serialization serialization) {
		serialization.serializeUser(user);
	}
    
    @Override
    public UserEntity saveUserToDatabase(final User user) {
    	UserEntity userEntity = userRepository.findById(user.getId()).orElse(null);
    	if(userEntity != null) {
    		// update fields
    		userEntity.setPokemons(stringifyPokemons(user.getPokemons()));
    		userEntity.setMoney(user.getMoney());
    		userEntity.setNewUser(user.getIsNewUser());
    		return userRepository.save(userEntity);
    	} else {
    		return userRepository.save(buildUserEntity(user));
    	}
    }
    
    @Override
	public User loadUser(final String username, final String password, final Serialization serialization) {
		final HashMap<String, User> users = serialization.deserializeUserList();
		return getUser(username, password, users);
	}
    
	private User getUser(final String username, final String password, final HashMap<String, User> users) {
		/*
		 * TODO: Delete this IF when done dev.
		 * Temporary code for Dev purpose.
		 * We create an admin user if none exist
		 */
		if(users.size() == 0) {
			return createTempUser();
		}
		
		for(User user : users.values()) {
			boolean isCorrectUser = user.getUsername().equals(username) && user.getPassword().equals(password);
			if(isCorrectUser) {
				return user;
			}
		}
		return null; // No User exists
	}
	
	
	/*
	 * Separate the pokemons list from the user object
	 * convert each to their respected java object
	 * add the pokemons list to the User object.
	 */
	private User convertJsonNodeToUserObject(final JsonNode userJsonNode) throws JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		
		// Handle Pokemons
		final JsonNode pokemons = userJsonNode.get("pokemons");
		final List<Pokemon> pokemonObjects = new ArrayList<>();
		
		for(JsonNode pokemon : pokemons) {
			final String pokemonJson = mapper.writeValueAsString(pokemon);
			final Pokemon pokemonObj = mapper.readValue(pokemonJson, Pokemon.class);
			pokemonObjects.add(pokemonObj);
		}
		
		// Handle User
		ObjectNode userObjectNode = ((ObjectNode) userJsonNode);
		userObjectNode.remove("pokemons");
		String userJson = mapper.writeValueAsString(userObjectNode);
		User user = mapper.readValue(userJson, User.class);
		
		// Set Pokemons on User
		user.setPokemons(pokemonObjects);
		
		return user;
	}
	
	/**
	 * Generates a user Id to assign to account
	 * @return userId
	 */
	@VisibleForTesting
	public String generateUserId() {
		final int size = 24;
		final SecureRandom secureRandom = new SecureRandom(); // Thread safe
		final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); // Thread safe
		byte[] randomBytes = new byte[size];
	    secureRandom.nextBytes(randomBytes);
	    
	    return base64Encoder.encodeToString(randomBytes);
	}
	
	/**
	 * Used only for Develop/testing purpose. TODO: Delete this method when dev is done
	 * @return User
	 */
	public User createTempUser() {
		final String adminUser = "admin";
		final String adminPassword = "testing1";
		final String adminEmail = "fake@mail.com";
		final int adminMoney = 100;
		final ArrayList<Pokemon> pokemons = new ArrayList<>();
		User user = new User(adminUser, adminPassword, adminEmail, adminMoney, true, pokemons);
		user.setUserId(generateUserId());
		
		return user;
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
	
	/**
	 * Builds the userEntity object needed to save to DB
	 * @param user
	 * @return
	 */
	private UserEntity buildUserEntity(final User user) {
		final UserEntity userEntity = UserEntity.builder()
				.userId(user.getUserId())
				.username(user.getUsername())
				.password(user.getPassword())
				.email(user.getEmail())
				.money(user.getMoney())
				.pokemons(stringifyPokemons(user.getPokemons()))
				.isNewUser(user.getIsNewUser())
				.build();
		
		return userEntity;
	}

	/**
	 * Store pokemons as JSON string in database for ease of storage
	 * @param pokemons
	 * @return
	 */
	private String stringifyPokemons(final List<Pokemon> pokemons) {
		// Store pokemons as JSON in database for ease of storage
		final JSONArray jsonArray = new JSONArray();
		return jsonArray.put(pokemons).toString();
	}
	
}
