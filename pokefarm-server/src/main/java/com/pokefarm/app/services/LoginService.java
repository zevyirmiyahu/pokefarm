package com.pokefarm.app.services;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;

import org.json.JSONObject;

import com.pokefarm.app.constants.PokeAppConstants.STATUS;
import com.pokefarm.app.constants.PokeAppConstants.TOKENS;
import com.pokefarm.app.constants.PokeAppConstants.JSON_KEYS;
import com.pokefarm.app.constants.PokeAppConstants.RESPONSE;; 

public class LoginService {
	// Dummy credentials
	private String adminId = "01";
	private String adminUser = "admin";
	private String adminPassword = "testing1";
	
	public String buildResponse(final String userName, final String password) {
		String status = adminUser.equals(userName) && adminPassword.equals(password) 
				? STATUS.LOGIN_SUCCESS : STATUS.LOGIN_FAILURE;
		String token = generateToken(status);
		
		JSONObject jsonOb = new JSONObject();
		jsonOb.put(JSON_KEYS.USER_ID, adminId);
		jsonOb.put(JSON_KEYS.USER_NAME, userName);
		jsonOb.put(JSON_KEYS.POKEMONS, new ArrayList<Object>());
		jsonOb.put(JSON_KEYS.LOGIN_REPONSE, RESPONSE.SUCCESS);
		
		
		return jsonOb.toString();
	}
	
	/**
	 * Generates a token to login verification
	 * @return token
	 */
	public String generateToken(final String status) {
		if (status.equals(STATUS.LOGIN_FAILURE)) {
			return TOKENS.TOKEN_FAILURE; // login failure
		}
		final SecureRandom secureRandom = new SecureRandom(); // Thread safe
		final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); // Thread safe
		byte[] randomBytes = new byte[24];
	    secureRandom.nextBytes(randomBytes);
	    
	    return base64Encoder.encodeToString(randomBytes);
	}
}
