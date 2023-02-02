package com.pokefarm.app;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.pokefarm.app.constants.PokeAppConstants.STATUS;

@RestController
public class Login {
	private String adminUser = "admin";
	private String adminPassword = "testing1";
	
	private String buildResponse(String userName, String password) {
		String status = adminUser.equals(userName) && adminPassword.equals(password) 
				? STATUS.LOGIN_SUCCESS : STATUS.LOGIN_FAILURE;
		
		JSONObject jsonOb = new JSONObject();
		jsonOb.put("user", userName);
		jsonOb.put("password", password);
		jsonOb.put("Authentication", status);
		
		return jsonOb.toString();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/Login", consumes = {"text/plain", "application/*"})
	public String getUserLogin(@RequestBody JsonNode credentials) {
		String userName = credentials.get("user").toString();
		String password = credentials.get("password").toString();
		String userName1 = credentials.get("user").toString();
		String password1 = credentials.get("password").textValue();
		
		
		return buildResponse(userName, password);
	}

}
