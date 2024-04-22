package com.example.typingsimulatorbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class LoripsumService {
    private final List<String> loripsumParagraphs = new ArrayList<>();
    private final RestTemplate restTemplate;
    private final Random random = new Random();

    @Autowired
    public LoripsumService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void fetchAndStoreLoripsumText() {
        String apiUrl = "https://loripsum.net/api/10/short/plaintext";
        String loripsumText = restTemplate.getForObject(apiUrl, String.class);
        String[] paragraphs = loripsumText.split("\\n\\n");
        loripsumParagraphs.clear();
        for (String paragraph : paragraphs) {
            loripsumParagraphs.add(paragraph.trim());
        }
    }

    public String getRandomParagraph() {
        if (loripsumParagraphs.isEmpty()) {
            fetchAndStoreLoripsumText();
        }
        int randomIndex = random.nextInt(loripsumParagraphs.size());
        return loripsumParagraphs.get(randomIndex).strip();
    }
}