package com.pokefarm.app.pojos;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Pokemon implements Serializable {
	private static final long serialVersionUID = 4445952753137902761L;
	private String uniqueId;
	private String id;
	private String name;
	private String[] types;
	private int money;
	private boolean isWorking;
	
	public Pokemon() {}
	
	public Pokemon(@JsonProperty("uniqueId") final String uniqueId, @JsonProperty("id") final String id, @JsonProperty("name") final String name, @JsonProperty("types") final String[] types,@JsonProperty("money") final int money, @JsonProperty("isWorking") final boolean isWorking) {
		this.uniqueId = uniqueId;
		this.id = id;
		this.name = name;
		this.types = types;
		this.money = money;
		this.isWorking = isWorking;
	}

	public String getUniqueId() {
		return uniqueId;
	}
	
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getMoney() {
		return money;
	}
	
	public String[] getTypes() {
		return types;
	}
	
	public boolean getIsWorking() {
		return isWorking;
	}
	
	public void setUniqueId(final String id) {
		
	}

	public void setId(final String id) {
		this.id = id;
	}


	public void setName(final String name) {
		this.name = name;
	}
	
	public void setMoney(final int money) {
		this.money = money;
	}

	public void setTypes(final String[] types) {
		this.types = types;
	}


	public void setIsWorking(final boolean isWorking) {
		this.isWorking = isWorking;
	}
	
}
