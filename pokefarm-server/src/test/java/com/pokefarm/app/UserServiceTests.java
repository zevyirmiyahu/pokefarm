package com.pokefarm.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.pokefarm.app.exceptions.UserCreationException;
import com.pokefarm.app.pojos.Pokemon;
import com.pokefarm.app.pojos.User;
import com.pokefarm.app.services.UserService;

public class UserServiceTests {
	private static final String USERNAME = "username";
	private static final String PASSWORD = "password";
	private static final String EMAIL = "email";
	private static final String MONEY = "money";
	private static final String POKEMONS = "pokemons";
	
	@Test
	public void testCreateUser() throws UserCreationException {
		// ARRANGE
		final UserService userService = new UserService();
		JsonNode userJsonNode = buildUserJsonNode("Red", "abc123", "fake@mail.com", 1000, new ArrayList<Pokemon>()); 

		// ACT
		User user = userService.createUser(userJsonNode);
		
		// ASSERT
		assertEquals("Red", user.getUsername());
		assertEquals("abc123", user.getPassword());
		assertEquals("fake@mail.com", user.getEmail());
		assertEquals(1000, user.getMoney());
		assertEquals(new ArrayList<Pokemon>(), user.getPokemons());
	}
	
	@Test
	public void testCreateUser_withPokemons() throws UserCreationException {
		// ARRANGE
		final UserService userService = new UserService();
		final ArrayList<Pokemon> pokemons = buildPokemonList();
		final JsonNode userJsonNode = buildUserJsonNode("Red", "abc123", "fake@mail.com", 1000, pokemons); 
		
		// ACT
		User user = userService.createUser(userJsonNode);
		
		// ASSERT
		Pokemon pokemon1 = user.getPokemons().get(0);
		Pokemon pokemon2 = user.getPokemons().get(1);
		
		// ensure all data has remained the same
		assertEquals("chikorita123", pokemon1.getUniqueId());
		assertEquals("Chikorita", pokemon1.getName());
		assertEquals("152", pokemon1.getId());
		assertEquals("grass", pokemon1.getTypes()[0]);
		assertEquals(false, pokemon1.getIsWorking());
		
		assertEquals("magikarp123", pokemon2.getUniqueId());
		assertEquals("Magikarp", pokemon2.getName());
		assertEquals("129", pokemon2.getId());
		assertEquals("water", pokemon2.getTypes()[0]);
		assertEquals(true, pokemon2.getIsWorking());
	}
	
	private JsonNode buildUserJsonNode(final String username, final String password, final String email, final int money, final ArrayList<Pokemon> pokemons) {
		final JsonNode jsonNode = JsonNodeFactory.instance.objectNode();
		final ArrayNode arrayNode = new ObjectMapper().valueToTree(pokemons);
		
		((ObjectNode) jsonNode).put(USERNAME, username);
		((ObjectNode) jsonNode).put(PASSWORD, password);
		((ObjectNode) jsonNode).put(EMAIL, email);
		((ObjectNode) jsonNode).put(MONEY, money);
		((ObjectNode) jsonNode).putArray(POKEMONS).addAll(arrayNode);
		
		return jsonNode;
	}
	
	private ArrayList<Pokemon> buildPokemonList() {
		final ArrayList<Pokemon> pokemons = new ArrayList<Pokemon>();
		final Pokemon chikorita = new Pokemon("chikorita123", "152", "Chikorita", new String[] {"grass"}, false);
		final Pokemon magikarp = new Pokemon("magikarp123", "129", "Magikarp", new String[] {"water"}, true);
		pokemons.add(chikorita);
		pokemons.add(magikarp);
		
		return pokemons;
	}
}
