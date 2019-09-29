package com.boxy.reactcrudcomponent.web.controller;

import com.boxy.reactcrudcomponent.entity.User;
import com.boxy.reactcrudcomponent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> list() {
        return this.repository.findAll();
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return this.repository.save(user);
    }

    @GetMapping("/{id}")
    public User find(@PathVariable Long id) {
        return this.repository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.repository.deleteById(id);
    }
}
