package com.example.typingsimulatorbackend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/auth/callback")
    public void handleCallback(@AuthenticationPrincipal OAuth2User principal) {
        // Handle the OAuth2 callback
        // TODO: Retrieve the authenticated user's information here and perform any necessary actions (e.g., create/update user in the database)

        // Example: Retrieve user's information
        String username = principal.getAttribute("login");
        String email = principal.getAttribute("email");

        // TODO: Create/update user in the database based on the retrieved information. Can use the UserProfileService to save the user's information

        // Example: Print the retrieved user's information
        System.out.println("Authenticated User: " + username);
        System.out.println("Email: " + email);
    }

    @GetMapping("/auth/user")
    public OAuth2User getUser(@AuthenticationPrincipal OAuth2User principal) {
        // Return the authenticated user's information
        return principal;
    }
}