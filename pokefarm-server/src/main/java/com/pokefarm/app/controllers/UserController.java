package com.pokefarm.app.controllers;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.beans.User;
import com.pokefarm.app.services.LoginService;
import com.pokefarm.app.services.UserService;

@RestController
public class UserController {
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/select-pokemon", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> updateUser(@RequestBody final JsonNode user) {
		final UserService loginService = new UserService();
		
		final int userId = user.get("userId").asInt();
		final String userName = user.get("username").asText();
		final String email = "fake@email.com";
		final String pokemons = user.get("pokemons").asText();
		final User updatedUser = new User(userId, userName, email, new ArrayList<Object>());
		
		// fix this
//		return new ResponseEntity<User>(updatedUser, "Success");
		return null;
	}
}
