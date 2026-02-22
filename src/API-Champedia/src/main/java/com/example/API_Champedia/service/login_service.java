package com.example.API_Champedia.service;

import com.example.API_Champedia.model.login_model;
import com.example.API_Champedia.repository.login_repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class login_service {

    @Autowired
    private login_repository loginRepository;

    // GET ALL USERS
    public List<login_model> getAllUsers() {
        return loginRepository.findAll();
    }

    // GET USER BY EMAIL
    public login_model getUserByEmail(String email) {
        return loginRepository.findByEmail(email).orElse(null);
    }

    // REGISTER USER
    public login_model registerUser(login_model user) {

        // VALIDASI
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().length() < 10) {
            throw new IllegalArgumentException("Password must be at least 10 characters");
        }

        Optional<login_model> existingUser = loginRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new DuplicateEmailException("Email already registered");
        }

        return loginRepository.save(user);
    }

    // LOGIN (VALIDASI MANUAL)
    public login_model login(String email, String password) {

        if (email == null || email.isEmpty()) {
            return null;
        }

        if (password == null || password.isEmpty()) {
            return null;
        }

        Optional<login_model> userOpt = loginRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            login_model user = userOpt.get();

            // COCOKIN PASSWORD MANUAL
            if (user.getPassword().equals(password)) {
                return user;
            }
        }

        return null;
    }

    // UPDATE PASSWORD
    public login_model updatePassword(String email, String newPassword) {

        if (newPassword == null || newPassword.length() < 10) {
            throw new IllegalArgumentException("Password must be at least 10 characters");
        }

        Optional<login_model> user = loginRepository.findByEmail(email);

        if (user.isPresent()) {
            login_model u = user.get();
            u.setPassword(newPassword);
            return loginRepository.save(u);
        }

        return null;
    }

    // DELETE USER
    public boolean deleteUser(String email) {
        Optional<login_model> user = loginRepository.findByEmail(email);

        if (user.isPresent()) {
            loginRepository.delete(user.get());
            return true;
        }

        return false;
    }

    // Custom Exception
    public class DuplicateEmailException extends RuntimeException {
        public DuplicateEmailException(String message) {
            super(message);
        }
    }
}


    
