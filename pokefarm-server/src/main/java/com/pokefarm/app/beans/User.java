package com.pokefarm.app.beans;

import java.util.ArrayList;
import java.util.List;

public class User {
	private int userId = -1;
	private String userName;
	private String email;
	private List<Object> pokemons = new ArrayList<>();
	
	public User(int userId, String userName, String email, List<Object> pokemons) {
		this.userId = userId;
		this.userName = userName;
		this.email = email;
		this.pokemons = pokemons;
	}

	// Setters
	public void setUserId(int userId) {
		this.userId = userId;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setPokemons(List<Object> pokemons) {
		this.pokemons = pokemons;
	}
	
	// Getters
	public int getUserId() {
		return userId;
	}


	public String getUserName() {
		return userName;
	}


	public String getEmail() {
		return email;
	}


	public List<Object> getPokemons() {
		return pokemons;
	}

}
