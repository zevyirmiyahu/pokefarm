package com.pokefarm.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.pokefarm.app.constants.PokeAppConstants.STATUS;

@RestController
public class Login {
	private String adminUser = "admin";
	private String adminPassword = "testing1";
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/Login", consumes = "application/json")
	public String getUserLogin(@RequestBody String data) {
		String[] credentials = data.split("-");
		String userName = credentials[0];
		String password = credentials[1];
		
		String status = adminUser.equals(userName) && adminPassword.equals(password) 
				? STATUS.LOGIN_SUCCESS : STATUS.LOGIN_FAILURE;
		
		return status;
	}

}
