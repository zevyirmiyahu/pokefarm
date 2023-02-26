package com.pokefarm.app.exceptions;

public class UserCreationException extends Exception {
	private static final String ERROR_MSG = "An exception occured during the user creation process.";
	
	public UserCreationException(Throwable throwable) {
		super(ERROR_MSG, throwable);
	}
}
