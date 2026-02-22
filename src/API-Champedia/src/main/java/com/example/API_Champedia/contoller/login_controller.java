package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.login_model;
import com.example.API_Champedia.service.login_service;
import com.example.API_Champedia.service.login_service.DuplicateEmailException;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class login_controller {

    @Autowired
    private login_service loginService;

    // GET ALL USERS
    @GetMapping
    public List<login_model> getAllUsers() {
        return loginService.getAllUsers();
    }

    // GET USER BY EMAIL
    @GetMapping("/{email}")
    public login_model getUserByEmail(@PathVariable String email) {
        return loginService.getUserByEmail(email);
    }

    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody login_model user) {
        try {
            login_model newUser = loginService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<?> login(@RequestBody login_model user) {

        login_model foundUser = loginService.login(
            user.getEmail(),
            user.getPassword()
        );

        if (foundUser != null) {
            return ResponseEntity.ok(foundUser);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }

    // UPDATE PASSWORD
    @PutMapping("/{email}")
    public login_model updatePassword(@PathVariable String email, @RequestBody login_model userData) {
        return loginService.updatePassword(email, userData.getPassword());
    }

    // DELETE USER
    @DeleteMapping("/{email}")
    public boolean deleteUser(@PathVariable String email) {
        return loginService.deleteUser(email);
    }
}
