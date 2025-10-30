package com.example.demo.Controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAll() {
        return userRepository.findAll(); // used to print all data
    }

    @PostMapping
    public User create(@RequestBody User user) {
        // TODO: process POST request

        return userRepository.save(user);
    }

    @GetMapping("/{appName}")
    public User getOne(@PathVariable String appName) {
        return userRepository.findById(appName).orElse(null);
    }

    @DeleteMapping("/{appName}")
    public void delete(@PathVariable String appName) {
        userRepository.deleteById(appName);
    }

    @PutMapping("/{appName}")
    public ResponseEntity<?> update(@PathVariable String appName, @RequestBody Map<String, String> updates) {
        try {
            User existingUser = userRepository.findById(appName)
                    .orElseThrow(() -> new NoSuchElementException("No user found with appName: " + appName));

            // Update only the fields that are present in the request
            if (updates.containsKey("email")) {
                existingUser.setEmail(updates.get("email"));
            }
            if (updates.containsKey("password")) {
                existingUser.setPassword(updates.get("password"));
            }

            User updatedUser = userRepository.save(existingUser);
            return ResponseEntity.ok()
                    .body(Map.of(
                            "message", "User updated successfully",
                            "user", updatedUser));

        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
