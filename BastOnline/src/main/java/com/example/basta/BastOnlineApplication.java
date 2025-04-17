package com.example.basta;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.basta.repository")
@EntityScan(basePackages = "com.example.basta.entity")
public class BastOnlineApplication {
	@Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
	
	public static void main(String[] args) {
		SpringApplication.run(BastOnlineApplication.class, args);
	}

}
