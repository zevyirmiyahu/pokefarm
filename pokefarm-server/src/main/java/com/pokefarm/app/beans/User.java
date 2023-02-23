package com.pokefarm.app.beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	private String userId = "0x"; // Temporary ID
	private String username;
	private String password;
	private String email;
	private List<Pokemon> pokemons;
	
	public User(@JsonProperty("username") final String username, @JsonProperty("password") final String password, @JsonProperty("email") final String email, @JsonProperty("pokemons") final List<Pokemon> pokemons) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.pokemons = pokemons;
	}

	// Setters
	public void setUserId(final String userId) {
		this.userId = userId;
	}

	public void setUserName(final String username) {
		this.username = username;
	}
	
	public void setPassword(final String password) {
		this.password = password;
	}
	
	public void setEmail(final String email) {
		this.email = email;
	}
	
	public void setPokemons(final List<Pokemon> pokemons) {
		this.pokemons = pokemons;
	}
	
	// Getters
	public String getUserId() {
		return userId;
	}


	public String getUsername() {
		return username;
	}
	
	public String getPassword() {
		return password;
	}


	public String getEmail() {
		return email;
	}


	public List<Pokemon> getPokemons() {
		return pokemons;
	}

}
