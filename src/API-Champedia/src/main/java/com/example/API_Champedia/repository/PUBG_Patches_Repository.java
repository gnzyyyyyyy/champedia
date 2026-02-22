package com.example.API_Champedia.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.API_Champedia.model.PUBG_Patches_Model;

@Repository
public interface PUBG_Patches_Repository extends MongoRepository<PUBG_Patches_Model, String> {
    
}
