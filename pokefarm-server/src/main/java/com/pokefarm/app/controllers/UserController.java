package com.pokefarm.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.beans.Pokemon;
import com.pokefarm.app.beans.User;
import com.pokefarm.app.services.UserService;

@RestController
public class UserController {
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/update-user", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> updateUser(@RequestBody final JsonNode user) {
		final UserService userService = new UserService();
		final List<Pokemon> pokemons = new ArrayList<>(); // fill
		
		final int userId = user.get("userId").asInt();
		final String userName = user.get("username").asText();
		final String email = "fake@email.com";
//		final String pokemons = user.get("pokemons").asText();
//		final User updatedUser = new User(userId, userName, email, new ArrayList<Pokemon>());
		
		// fix this
//		return new ResponseEntity<User>(updatedUser, "Success");
		return null;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/create", consumes = {"text/plain", "application/*"})
	public ResponseEntity<User> createUser(@RequestBody final JsonNode userjsonNode) {
		final UserService userService = new UserService();
		
		try {
			User user = userService.createUser(userjsonNode);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ResponseEntity
				.internalServerError()
				.body(null);
	}
	
	
}
