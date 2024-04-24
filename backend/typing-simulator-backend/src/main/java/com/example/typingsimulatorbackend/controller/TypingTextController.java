package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.service.LoripsumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/typing-text")
@CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081", "*", "backend-production-b3bc.up.railway.app"})
public class TypingTextController {
    private final LoripsumService loripsumService;

    @Autowired
    public TypingTextController(LoripsumService loripsumService) {
        this.loripsumService = loripsumService;
    }

    @GetMapping("/random-paragraph")
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081", "*", "backend-production-b3bc.up.railway.app"})
    public String getRandomParagraph() {
        return loripsumService.getRandomParagraph();
    }
}
