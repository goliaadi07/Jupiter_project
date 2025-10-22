package com.jupiter.jwtauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient 

public class JwtauthApplication {
    public static void main(String[] args) {
        SpringApplication.run(JwtauthApplication.class, args);
    }
}
