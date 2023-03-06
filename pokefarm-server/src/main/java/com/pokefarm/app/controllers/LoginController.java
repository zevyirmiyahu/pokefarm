package com.pokefarm.app.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.serialization.Serialization;
import com.pokefarm.app.services.UserService;

@RestController
public class LoginController {
	
	@Autowired
	private UserService userService;
	
    private static final Logger LOGGER = LogManager.getLogger(LoginController.class);
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/login", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> getUserLogin(@RequestBody JsonNode credentials) {
		// final LoginService loginService = new LoginService();
		final Serialization serialization = new Serialization();
		
		String username = credentials.get("username").textValue();
		String password = credentials.get("password").textValue();
		
		// Deserialize user data
		User user = userService.loadUser(username, password, serialization);
		LOGGER.info("Successfully Logged in User: " + username);
		boolean val = user.getIsNewUser();
		System.out.println(val);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
