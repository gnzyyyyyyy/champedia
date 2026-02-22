package com.example.API_Champedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
    "com.example.API_Champedia"
})
public class ApiChampediaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiChampediaApplication.class, args);
	}

}
