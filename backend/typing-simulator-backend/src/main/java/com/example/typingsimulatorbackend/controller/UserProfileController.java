package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.model.UserProfile;
import com.example.typingsimulatorbackend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-profile")
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileService;
    
    @GetMapping("/{id}")
    public UserProfile getUserProfile(@PathVariable Long id) {
        return userProfileService.getUserProfileById(id);
    }
    
    // Other controller methods
}