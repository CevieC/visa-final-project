package com.example.typingsimulatorbackend.service;

import com.example.typingsimulatorbackend.model.Entry;
import com.example.typingsimulatorbackend.repository.LeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    @Autowired
    public LeaderboardService(LeaderboardRepository leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
    }

    public List<Entry> getLeaderboardData(String category) {
        return leaderboardRepository.findByCategory(category);
    }

    public Entry createLeaderboardEntry(Entry leaderboardEntry) {
        return leaderboardRepository.save(leaderboardEntry);
    }

    public void deleteLeaderboardEntry(Long id) {
        Entry existingEntry = leaderboardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Leaderboard entry not found with id: " + id));

        leaderboardRepository.delete(existingEntry);
    }
}