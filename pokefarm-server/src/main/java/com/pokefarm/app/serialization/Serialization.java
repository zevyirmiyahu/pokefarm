package com.pokefarm.app.serialization;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.pokefarm.app.constants.SerializationConstants.SERIALIZATION;
import com.pokefarm.app.pojos.User;

public class Serialization {
	
	public void serializeUser(User user) {
		final FileOutputStream fileOut;
		
		try {
			fileOut = new FileOutputStream(SERIALIZATION.FILE_NAME);
			ObjectOutputStream outputStream = new ObjectOutputStream(fileOut);
			outputStream.writeObject(user);
			outputStream.close();
			fileOut.close();
			System.out.println(SERIALIZATION.SERIALIZAION_SUCCESS_MSG);
		} catch (IOException e) {	
			System.err.println(SERIALIZATION.SERIALIZAION_FAILURE_MSG);
			e.printStackTrace();
		}
	}
	
	public User deserializeUser() {
		
		User user = null;
		try {
			FileInputStream fileIn = new FileInputStream(SERIALIZATION.FILE_NAME);
			ObjectInputStream inputStream = new ObjectInputStream(fileIn);
	        user = (User) inputStream.readObject();
	        inputStream.close();
	        fileIn.close();
	        return user;
		} catch (IOException ioException) {
			System.err.println(SERIALIZATION.DESERIALIZAION_FAILURE_MSG_1);
			ioException.printStackTrace();
	        return null;
		} catch (ClassNotFoundException classNotFoundException) {
			System.err.println(SERIALIZATION.DESERIALIZAION_FAILURE_MSG_2);
			classNotFoundException.printStackTrace();
			return null;
		}
	}
}
