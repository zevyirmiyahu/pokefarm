package com.pokefarm.app.serialization;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.pokefarm.app.pojos.User;

public class Serialization {
	
	private final static String FILE_PATH = "user.ser";
	
	public void serializeUser(User user) {
		final FileOutputStream fileOut;
		
		try {
			fileOut = new FileOutputStream(FILE_PATH);
			ObjectOutputStream out = new ObjectOutputStream(fileOut);
			out.writeObject(user);
			out.close();
			fileOut.close();
			System.out.println("Data Serialized successfully!");
		} catch (IOException e) {	
			System.err.println("Exception encountered write user object " + e.getMessage());
		}
	}
	
	public User deserializeUser() {
		User user = null;
		try {
			FileInputStream fileIn = new FileInputStream("/tmp/employee.ser");
			ObjectInputStream in = new ObjectInputStream(fileIn);
	        user = (User) in.readObject();
	        in.close();
	        fileIn.close();
	        return user;
		} catch (IOException ioException) {
			System.err.println("Exception encountered with file input stream " + ioException.getMessage());
	        return null;
		} catch (ClassNotFoundException classNotFoundException) {
			System.err.println("User class NOT found " + classNotFoundException.getMessage());
			return null;
		}
	}
}
