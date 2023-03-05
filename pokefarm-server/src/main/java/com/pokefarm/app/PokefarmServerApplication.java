package com.pokefarm.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@ComponentScan(basePackages={"com.pokefarm.app.repositories"}) 
//@EntityScan(basePackages={"com.pokefarm.app.entities"}) 
//@EnableJpaRepositories(basePackages = { "com.pokefarm.app.repositories" }) 

//@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@SpringBootApplication
public class PokefarmServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokefarmServerApplication.class, args);
	}
}

