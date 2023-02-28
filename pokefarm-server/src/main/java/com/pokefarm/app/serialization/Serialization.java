package com.pokefarm.app.serialization;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.pokefarm.app.constants.SerializationConstants.SERIALIZATION;
import com.pokefarm.app.pojos.User;

public class Serialization {
    private static final Logger LOGGER = LogManager.getLogger();

	public void serializeUser(User user) {		
		try {
			// obtain Users data from file
			HashMap<String, User> users = deserializeUserList();
			users.put(user.getUserId(), user);
			
			// file outputStream wipes data from target file, so call after deserializeUserList()
			final FileOutputStream fileOut = new FileOutputStream(SERIALIZATION.FILE_NAME);
			ObjectOutputStream outputStream = new ObjectOutputStream(fileOut);
			outputStream.writeObject(users);
			outputStream.close();
			fileOut.close();
			LOGGER.info(SERIALIZATION.SERIALIZAION_SUCCESS_MSG);
		} catch (IOException ioException) {	
			LOGGER.error(SERIALIZATION.SERIALIZAION_FAILURE_MSG, ioException);
		}
	}
	
	
	public HashMap<String, User> deserializeUserList() {
		try {
			FileInputStream fileIn = new FileInputStream(SERIALIZATION.FILE_NAME);
			final int numOfBytes = fileIn.available();
			final int minFileSize = 8; 
			
			// File is empty if 8 or less bytes, EOFException -> if this input stream reaches the end before reading eight bytes.
			if(numOfBytes > minFileSize) {
				ObjectInputStream inputStream = new ObjectInputStream(fileIn);
				// No users exist in user.ser, so return empty ArrayList to start process
				final HashMap<String, User> users = (HashMap<String, User>) inputStream.readObject();
				inputStream.close();
				fileIn.close();
				return users;
			} else {
				fileIn.close();
				return new HashMap<String, User>();
			}
		} catch (IOException ioException) {
			LOGGER.error(SERIALIZATION.DESERIALIZAION_FAILURE_MSG_1, ioException);
	        return null;
		} catch (ClassNotFoundException classNotFoundException) {
			LOGGER.error(SERIALIZATION.DESERIALIZAION_FAILURE_MSG_2, classNotFoundException);
			return null;
		}
	}
}
