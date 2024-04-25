package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.model.User;
import com.example.typingsimulatorbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = { "https://typingtest.up.railway.app", "http://localhost:8081", "*",
        "backend-production-b3bc.up.railway.app" })
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    @CrossOrigin(origins = { "https://typingtest.up.railway.app:8080", "http://localhost:8080", "*",
            "backend-production-b3bc.up.railway.app" })
    public String login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    @PostMapping("/register")
    @CrossOrigin(origins = { "https://typingtest.up.railway.app", "http://localhost:8081", "*",
            "backend-production-b3bc.up.railway.app" })
    public boolean createLeaderboardEntry(@RequestBody User user) {
        return userService.register(user.getUsername(), user.getPassword());
    }

}
