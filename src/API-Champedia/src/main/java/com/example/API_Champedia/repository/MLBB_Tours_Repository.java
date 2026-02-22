package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.MLBB_Tours_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MLBB_Tours_Repository extends MongoRepository<MLBB_Tours_Model, String> {
    List<MLBB_Tours_Model> findByTourTier(String tourTier);
}
