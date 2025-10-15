package com.jupiter.jwtauth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "__________________________________________________________AI ADOPTION DASHBOARD__________________________________________________________";
    }
}
