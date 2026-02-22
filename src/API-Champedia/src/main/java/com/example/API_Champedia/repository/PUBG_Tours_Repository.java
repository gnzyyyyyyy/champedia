package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.PUBG_Tours_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PUBG_Tours_Repository extends MongoRepository<PUBG_Tours_Model, String> {
    List<PUBG_Tours_Model> findByTourTier(String tourTier);
}
