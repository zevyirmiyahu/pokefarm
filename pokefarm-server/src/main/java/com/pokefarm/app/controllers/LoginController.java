package com.pokefarm.app.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.services.LoginService;

@RestController
public class LoginController {
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/Login", consumes = {"text/plain", "application/*"})
	public String getUserLogin(@RequestBody JsonNode credentials) {
		final LoginService loginService = new LoginService();
		String userName = credentials.get("user").textValue();
		String password = credentials.get("password").textValue();

		return loginService.buildResponse(userName, password);
	}

}
