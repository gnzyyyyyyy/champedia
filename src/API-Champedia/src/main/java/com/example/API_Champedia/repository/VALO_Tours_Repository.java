package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.VALO_Tours_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VALO_Tours_Repository extends MongoRepository<VALO_Tours_Model, String> {
    List<VALO_Tours_Model> findByTourTier(String tourTier);
}
