package com.taskhive.controller;

import com.taskhive.entity.User;
import com.taskhive.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) {
        try {
            log.info("join user {}", user);
            user.setPw(passwordEncoder.encode(user.getPw()));
            userRepository.save(user);
            return ResponseEntity.ok("join success");
        } catch (Exception e) {
            log.error("Failed to save user: {}", e.getMessage());
            return ResponseEntity.badRequest().body("join failed");
        }
    }

    @GetMapping("/find")
    public ResponseEntity<String> find(@RequestParam String type, @RequestParam String email) {
        log.info("find user type {}", type);
        log.info("find user email {}", email);

        User user = null;
        if ("email".equals(type)) {
            user = userRepository.findByEmail(email);
        } else if ("nickname".equals(type)) {
            user = userRepository.findByNickname(email);
        }

        if (user != null) {
            return ResponseEntity.ok("User found");
        } else {
            return ResponseEntity.ok("User not found");
        }
    }
}
