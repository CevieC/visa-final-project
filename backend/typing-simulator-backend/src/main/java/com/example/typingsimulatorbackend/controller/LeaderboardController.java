package com.example.typingsimulatorbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LeaderboardController {

    @GetMapping("/api/leaderboard")
    public List<LeaderboardEntry> getLeaderboardData(@RequestParam String category) {
        // Retrieve leaderboard data based on the category
        List<LeaderboardEntry> leaderboardData = new ArrayList<>();

        // TODO: Implement the logic to fetch leaderboard data from the database or any other data source
        // For now, let's return some hardcoded data as an example
        leaderboardData.add(new LeaderboardEntry(1, "john_doe", category, 98, 120));
        leaderboardData.add(new LeaderboardEntry(2, "jane_smith", category, 95, 110));
        // Add more entries as needed

        return leaderboardData;
    }
}