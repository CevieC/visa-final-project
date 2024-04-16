package com.example.typingsimulatorbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LoripsumService {
    private final RedisTemplate<String, String> redisTemplate;
    private final RestTemplate restTemplate;

    @Autowired
    public LoripsumService(RedisTemplate<String, String> redisTemplate, RestTemplate restTemplate) {
        this.redisTemplate = redisTemplate;
        this.restTemplate = restTemplate;
    }

    public void fetchAndStoreLoripsumText() {
        String apiUrl = "https://loripsum.net/api/10/short/plaintext";
        String loripsumText = restTemplate.getForObject(apiUrl, String.class);

        String[] paragraphs = loripsumText.split("\\n\\n");
        for (int i = 0; i < paragraphs.length; i++) {
            redisTemplate.opsForValue().set("loripsum_paragraph_" + i, paragraphs[i]);
        }
    }

    public String getRandomParagraph() {
        int totalParagraphs = 10;
        int randomIndex = (int) (Math.random() * totalParagraphs);
        return redisTemplate.opsForValue().get("loripsum_paragraph_" + randomIndex);
    }
}