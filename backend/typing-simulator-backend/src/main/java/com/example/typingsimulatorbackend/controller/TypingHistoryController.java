package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.model.Entry;
import com.example.typingsimulatorbackend.service.TypingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/typing-history")
@CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081"})
public class TypingHistoryController {

    private final TypingHistoryService typingHistoryService;

    @Autowired
    public TypingHistoryController(TypingHistoryService typingHistoryService) {
        this.typingHistoryService = typingHistoryService;
    }

    @GetMapping("/{userId}")
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081"})
    public List<Entry> getTypingHistoryByUser(@PathVariable Long userId) {
        return typingHistoryService.getTypingHistoryByUser(userId);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081"})
    public void deleteTypingHistoryEntry(@PathVariable Long id) {
        typingHistoryService.deleteTypingHistoryEntry(id);
    }

    @DeleteMapping("/user/{userId}")
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081"})
    public void deleteAllTypingHistoryEntriesByUser(@PathVariable Long userId) {
        typingHistoryService.deleteAllTypingHistoryEntriesByUser(userId);
    }
}