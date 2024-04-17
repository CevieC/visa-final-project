package com.example.typingsimulatorbackend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}