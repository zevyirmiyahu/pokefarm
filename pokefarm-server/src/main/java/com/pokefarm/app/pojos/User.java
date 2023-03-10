package com.pokefarm.app.pojos;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokefarm.app.constants.UserConstants.USER;

//@JsonIgnoreProperties(value = { "isNewUser" })
public class User implements Serializable {
	private static final long serialVersionUID = -3184860057020512007L;
	private Integer id = -1; // Database primary key
	private String userId = USER.INITIAL_ID; // Temporary ID
	private String username;
	private String password;
	private String email;
	private int money; 
	private boolean isNewUser;
	private List<Pokemon> pokemons;
	
	public User() {}
	
	public User(
			@JsonProperty("username") final String username, 
			@JsonProperty("password") final String password, 
			@JsonProperty("email") final String email, 
			@JsonProperty("money") final int money, 
			@JsonProperty("isNewUser")final boolean isNewUser, 
			@JsonProperty("pokemons") final List<Pokemon> pokemons
			) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.money = money;
		this.isNewUser = isNewUser;
		this.pokemons = pokemons;
	}

	// Setters
	public void setId(final Integer id) {
		this.id = id;
	}
	
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
	
	public void setMoney(final int money) {
		this.money = money;
	}
	
	public void setIsNewUser(final boolean isNewUser) {
		this.isNewUser = isNewUser;
	}
	
	public void setPokemons(final List<Pokemon> pokemons) {
		this.pokemons = pokemons;
	}
	
	// Getters
	public Integer getId() {
		return id;
	}
	
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
	
	public int getMoney() {
		return money;
	}
	
	public boolean getIsNewUser() {
		return isNewUser;
	}

	public List<Pokemon> getPokemons() {
		return pokemons;
	}
}
