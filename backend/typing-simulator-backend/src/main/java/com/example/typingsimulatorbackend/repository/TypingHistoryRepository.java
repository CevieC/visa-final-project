package com.example.typingsimulatorbackend.repository;

import com.example.typingsimulatorbackend.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypingHistoryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUserId(Long userId);
}