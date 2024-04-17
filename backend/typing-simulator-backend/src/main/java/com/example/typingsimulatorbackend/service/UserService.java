package com.example.typingsimulatorbackend.service;

import com.example.typingsimulatorbackend.model.User;
import com.example.typingsimulatorbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public String login(String username, String password) {
        // Perform login logic and return the user ID if successful
        // Return null if login fails
        User user = userRepository.findByUsernameAndPassword(username, password);
        if (user != null) {
            return user.getId().toString();
        }
        return null;
    }

    public boolean register(String username, String password) {
        // Perform registration logic and return true if successful
        // Return false if registration fails
        if (userRepository.existsByUsername(username)) {
            return false;
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        return true;
    }
}