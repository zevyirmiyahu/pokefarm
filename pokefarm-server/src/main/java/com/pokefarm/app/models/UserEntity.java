package com.pokefarm.app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id; // Database primary key
	
	@Column(name = "user_id", nullable = false)
	private String userId;
	
	@Column(name = "user_name", nullable = false)
	private String username;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@Column(name = "money", nullable = false)
	private int money; 
	
	@Column(name = "pokemons", nullable = false)
	private String pokemons;
	

//	// Setters
//	public void setId(final Integer id) {
//		this.id = id;
//	}
//	
//	public void setUserId(final String userId) {
//		this.userId = userId;
//	}
//
//	public void setUserName(final String username) {
//		this.username = username;
//	}
//	
//	public void setPassword(final String password) {
//		this.password = password;
//	}
//	
//	public void setEmail(final String email) {
//		this.email = email;
//	}
//	
//	public void setMoney(final int money) {
//		this.money = money;
//	}
//	
//	public void setPokemons(final String pokemons) {
//		this.pokemons = pokemons;
//	}
//	
//	// Getters
//	public Integer getId() {
//		return id;
//	}
//	
//	public String getUserId() {
//		return userId;
//	}
//
//
//	public String getUsername() {
//		return username;
//	}
//	
//	public String getPassword() {
//		return password;
//	}
//
//
//	public String getEmail() {
//		return email;
//	}
//	
//	public int getMoney() {
//		return money;
//	}
//
//	public String getPokemons() {
//		return pokemons;
//	}
}
