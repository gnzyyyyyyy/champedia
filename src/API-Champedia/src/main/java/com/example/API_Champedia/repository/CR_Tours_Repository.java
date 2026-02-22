package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Tours_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CR_Tours_Repository extends MongoRepository<CR_Tours_Model, String> {
    List<CR_Tours_Model> findByTourTier(String tourTier);
}
