package com.pokefarm.app.beans;

public class Pokemon {
	private String id;
	private String name;
	private String[] types;
	private boolean isWorking;
	
	public Pokemon(final String id, final String name, final String[] types, final boolean isWorking ) {
		this.id = id;
		this.name = name;
		this.types = types;
		this.isWorking = isWorking;
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

	public void setId(String id) {
		this.id = id;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setTypes(String[] types) {
		this.types = types;
	}


	public void setIsWorking(boolean isWorking) {
		this.isWorking = isWorking;
	}
	
}
