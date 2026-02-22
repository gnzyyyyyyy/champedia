package com.example.API_Champedia.repository;

import org.springframework.stereotype.Repository;
import com.example.API_Champedia.model.VALO_Maps_Model;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface VALO_Maps_Repository extends MongoRepository<VALO_Maps_Model, String> {
    Optional<VALO_Maps_Model> findByMapNameIgnoreCase(String mapName);
} 
