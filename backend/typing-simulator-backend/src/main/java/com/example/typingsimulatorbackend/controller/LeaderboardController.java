package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.model.Entry;
import com.example.typingsimulatorbackend.service.LeaderboardService;
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
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081",  "backend-production-b3bc.up.railway.app"})
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    @CrossOrigin(origins = {"https://typingtest.up.railway.app:8080", "http://localhost:8080", "backend-production-b3bc.up.railway.app"})
    public List<Entry> getLeaderboardData(@RequestParam String category) {
        return leaderboardService.getLeaderboardData(category);
    }

    @PostMapping
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081", "backend-production-b3bc.up.railway.app"})
    public Entry createLeaderboardEntry(@RequestBody Entry leaderboardEntry) {
        return leaderboardService.createLeaderboardEntry(leaderboardEntry);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = {"https://typingtest.up.railway.app", "http://localhost:8081", "backend-production-b3bc.up.railway.app"})
    public void deleteLeaderboardEntry(@PathVariable Long id) {
        leaderboardService.deleteLeaderboardEntry(id);
    }
}
