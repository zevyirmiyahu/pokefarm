package com.pokefarm.app.services.email;

public interface EmailService {

	/*
	 * For sending an simple email
	 */
	public void sendEmail(final String userEmail, final String userName);
}
