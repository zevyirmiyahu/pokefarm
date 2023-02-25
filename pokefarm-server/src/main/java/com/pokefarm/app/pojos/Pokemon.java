package com.pokefarm.app.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Pokemon {
	private String uniqueId;
	private String id;
	private String name;
	private String[] types;
	private boolean isWorking;
	
	public Pokemon(@JsonProperty("uniqueId") final String uniqueId, @JsonProperty("id") final String id, @JsonProperty("name") final String name, @JsonProperty("types") final String[] types, @JsonProperty("isWorking") final boolean isWorking) {
		this.uniqueId = uniqueId;
		this.id = id;
		this.name = name;
		this.types = types;
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


	public void setTypes(final String[] types) {
		this.types = types;
	}


	public void setIsWorking(final boolean isWorking) {
		this.isWorking = isWorking;
	}
	
}
