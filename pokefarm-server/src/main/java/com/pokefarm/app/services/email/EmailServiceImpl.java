package com.pokefarm.app.services.email;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.pokefarm.app.constants.EmailConstants.EMAIL;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
 
    public void sendEmail(final String userEmail, final String userName) {	
    	final boolean IS_HTML = true;
    	final String filePath = "../../resources/email-template.html";
    	final String imgPath = "src/main/java/com/pokefarm/app/resources/25.png";
        try {
        	MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        	MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        	
        	// Read HTML template
        	String htmlTemplate = readFile(filePath);
        	
        	// Replace place holders
        	htmlTemplate = htmlTemplate.replace("${userName}", userName);
        	htmlTemplate = htmlTemplate.replace("${mainMessage}", EMAIL.MESSAGE_BODY);
        	htmlTemplate = htmlTemplate.replace("${closingMessage}", EMAIL.MESSAGE_BODY_CLOSING);
        	
        	messageHelper.setFrom(EMAIL.SENDER);
        	messageHelper.setTo(userEmail);
        	messageHelper.setSubject(EMAIL.SUBJECT);
        	messageHelper.setText(htmlTemplate, IS_HTML);
        	
        	// Create & add image
        	Path path = Paths.get(imgPath);
        	File imageFile = path.toFile();
        	FileSystemResource resource = new FileSystemResource(imageFile);
        	messageHelper.addInline("pokemonImg", resource); 
 
            // Sending the mail
            javaMailSender.send(mimeMessage);
            System.out.println(EMAIL.SENT_SUCCESS);
        }
 
        // Catch block to handle the exceptions
        catch (Exception e) {
        	System.out.println(EMAIL.SENT_FAILURE);
        	e.printStackTrace();
        }
    }
    
    private String readFile(final String filePath) {
    	InputStream inputStream = null;

    	try {
    		inputStream = getClass().getResourceAsStream(filePath);
    		return readFromInputStream(inputStream);
    	} catch(Exception e) {
    		System.out.println("Exception reading inputstream!");
    		e.printStackTrace();
    	} finally {
    		if(inputStream != null) {
    			try {
    				inputStream.close();
    			} catch(IOException e) {
    				System.out.println("Exception closing inputstream!");
    	    		e.printStackTrace();
    			}
    		}
    	}
    	return null;
    }
    
    private String readFromInputStream(InputStream inputStream) throws IOException {
    	StringBuilder resultStringBuilder = new StringBuilder();
	    try {
	    	BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
	    	String line;
	    	while ((line = bufferedReader.readLine()) != null) {
	    		resultStringBuilder.append(line).append("\n");
	    	}
	    } catch(IOException e) {
	    	e.printStackTrace();
	    }
	    return resultStringBuilder.toString();
    }
}
