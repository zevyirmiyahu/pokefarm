package com.pokefarm.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class PokefarmServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokefarmServerApplication.class, args);
	}
}
