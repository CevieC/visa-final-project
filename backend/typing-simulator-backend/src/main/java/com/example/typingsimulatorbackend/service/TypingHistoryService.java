package com.example.typingsimulatorbackend.service;

import com.example.typingsimulatorbackend.model.Entry;
import com.example.typingsimulatorbackend.repository.TypingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypingHistoryService {

    private final TypingHistoryRepository typingHistoryRepository;

    @Autowired
    public TypingHistoryService(TypingHistoryRepository typingHistoryRepository) {
        this.typingHistoryRepository = typingHistoryRepository;
    }

    public List<Entry> getTypingHistoryByUser(Long userId) {
        return typingHistoryRepository.findByUserId(userId);
    }

    public void deleteTypingHistoryEntry(Long id) {
        Entry existingEntry = typingHistoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Typing history entry not found with id: " + id));

        typingHistoryRepository.delete(existingEntry);
    }

    public void deleteAllTypingHistoryEntriesByUser(Long userId) {
        List<Entry> userEntries = typingHistoryRepository.findByUserId(userId);
        typingHistoryRepository.deleteAll(userEntries);
    }
}