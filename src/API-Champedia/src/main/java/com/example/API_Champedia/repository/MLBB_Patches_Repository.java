package com.example.API_Champedia.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.API_Champedia.model.MLBB_Patches_Model;

@Repository
public interface MLBB_Patches_Repository extends MongoRepository<MLBB_Patches_Model, String> {
    
}
