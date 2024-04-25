package com.example.typingsimulatorbackend;

import com.example.typingsimulatorbackend.service.LoripsumService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TypingSimulatorBackendApplication {

    public static void main(String[] args) {
        System.out.println("Testing Test");
        SpringApplication.run(TypingSimulatorBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(LoripsumService loripsumService) {
        return args -> {
            loripsumService.fetchAndStoreLoripsumText();
        };
    }
}
