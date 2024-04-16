package com.example.typingsimulatorbackend.controller;

import com.example.typingsimulatorbackend.model.Entry;
import com.example.typingsimulatorbackend.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<Entry> getLeaderboardData(@RequestParam String category) {
        return leaderboardService.getLeaderboardData(category);
    }

    @PostMapping
    public Entry createLeaderboardEntry(@RequestBody Entry leaderboardEntry) {
        return leaderboardService.createLeaderboardEntry(leaderboardEntry);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaderboardEntry(@PathVariable Long id) {
        leaderboardService.deleteLeaderboardEntry(id);
    }
}