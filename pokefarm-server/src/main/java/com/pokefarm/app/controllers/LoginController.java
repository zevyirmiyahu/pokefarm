package com.pokefarm.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.services.LoginService;
import com.pokefarm.app.services.UserService;

@RestController
public class LoginController {
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/login", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> getUserLogin(@RequestBody JsonNode credentials) {
		final LoginService loginService = new LoginService();
		final UserService userService = new UserService();
		String username = credentials.get("username").textValue();
		String password = credentials.get("password").textValue();
		
		// Deserialize user data
		User user = userService.loadUser(username, password);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
