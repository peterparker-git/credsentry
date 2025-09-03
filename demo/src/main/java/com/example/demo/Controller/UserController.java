package com.example.demo.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // adding react
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
  public User update(@PathVariable String appName, @RequestBody User user) {
    // TODO: process PUT request
    user.setAppName(appName);
    return userRepository.save(user);
  }

}
