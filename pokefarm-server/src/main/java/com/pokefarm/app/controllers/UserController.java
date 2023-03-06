package com.pokefarm.app.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.models.UserEntity;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.serialization.Serialization;
import com.pokefarm.app.services.UserService;
import com.pokefarm.app.services.email.EmailService;

@RestController
public class UserController {

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private UserService userService;
	
	private static final Logger LOGGER = LogManager.getLogger(UserController.class);
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/update-user", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> updateUser(@RequestBody final JsonNode userField) {
//		User user = userService.updateUser(userField);
		
		return new ResponseEntity<User>(new User(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/create", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> createUser(@RequestBody final JsonNode userJsonNode) {
		try {
			return createOrSaveUser(userJsonNode, true);
		} catch (UserCreationException userCreationException) {
			final String errorMsg = "Exception occurred while trying to create a user";
			LOGGER.error(errorMsg, userCreationException);
		}
		
		return ResponseEntity
				.internalServerError()
				.body(null);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/save-user", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> saveUser(@RequestBody final JsonNode userJsonNode) {		
		try {
			return createOrSaveUser(userJsonNode, false);
		} catch (UserCreationException userCreationException) {
			final String errorMsg = "Exception occurred while trying to save a user";
			LOGGER.error(errorMsg, userCreationException);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	// On create we send an email else we do not.
	private ResponseEntity<User> createOrSaveUser(final JsonNode userJsonNode, final boolean shouldCreateUser) throws UserCreationException {
		final Serialization serialization = new Serialization();
		final User user = userService.createUser(userJsonNode);
		user.setIsNewUser(false); // ensure not a new user
		
		if (shouldCreateUser) {
			/*
			 * TODO: Uncomment this emailService code if you'd like to receive an email. See README.md for directions
			 */
			// emailService.sendEmail(user.getEmail(), user.getUsername());
			UserEntity userEntity = userService.saveUserToDatabase(user);
			user.setId(userEntity.getId()); // set DB Id
			userService.saveUser(user, serialization);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} else {
			userService.saveUser(user, serialization);
			userService.saveUserToDatabase(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/all")
	public @ResponseBody Iterable<UserEntity> getAllUsers() {
//		return userRepository.findAll(); // Returns a JSON or XML with the users
		return null;
	}
}
