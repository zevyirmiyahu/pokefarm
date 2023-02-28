package com.pokefarm.app.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.services.UserService;
import com.pokefarm.app.services.email.EmailService;

@RestController
public class UserController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

	
	@Autowired
	private EmailService emailService;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/update-user", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> updateUser(@RequestBody final JsonNode userField) {
		final UserService userService = new UserService();
		User user = userService.updateUser(userField);
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/create", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> createUser(@RequestBody final JsonNode userjsonNode) {
		final UserService userService = new UserService();
		
		try {
			User user = userService.createUser(userjsonNode);
			
			/*
			 * TODO: Uncomment this emailService code if you'd like to receive an email. See README.md for directions
			 */
			// emailService.sendEmail(user.getEmail(), user.getUsername());
			return new ResponseEntity<User>(user, HttpStatus.OK);
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
	public ResponseEntity<User> saveUser(@RequestBody final JsonNode userjsonNode) {
		final UserService userService = new UserService();
		try {
			final User user = userService.createUser(userjsonNode);	
			userService.saveUser(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (UserCreationException userCreationException) {
			final String errorMsg = "Exception occurred while trying to save a user";
			LOGGER.error(errorMsg, userCreationException);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
}
