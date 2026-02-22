package com.example.API_Champedia.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.API_Champedia.model.login_model;

import java.util.Optional;

@Repository
public interface login_repository extends MongoRepository<login_model, String> {

    // Cari user berdasarkan email
    Optional<login_model> findByEmail(String email);

    // Cari berdasarkan email + password (untuk login)
    Optional<login_model> findByEmailAndPassword(String email, String password);
}
