package com.example.typingsimulatorbackend.repository;

import com.example.typingsimulatorbackend.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderboardRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByCategory(String category);
}