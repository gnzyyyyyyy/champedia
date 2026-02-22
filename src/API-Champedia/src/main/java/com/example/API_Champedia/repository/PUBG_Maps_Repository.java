package com.example.API_Champedia.repository;

import org.springframework.stereotype.Repository;
import com.example.API_Champedia.model.PUBG_Maps_Model;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface PUBG_Maps_Repository extends MongoRepository<PUBG_Maps_Model, String> {
    Optional<PUBG_Maps_Model> findByMapNameIgnoreCase(String mapName);
} 
