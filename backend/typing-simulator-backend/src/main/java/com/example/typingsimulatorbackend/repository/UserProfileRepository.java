package com.example.typingsimulatorbackend.repository;

import com.example.typingsimulatorbackend.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    // Custom query methods, if needed
}