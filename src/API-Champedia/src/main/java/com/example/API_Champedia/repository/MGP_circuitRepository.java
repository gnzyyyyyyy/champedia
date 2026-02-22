package com.example.API_Champedia.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_circuitModel;

public interface MGP_circuitRepository extends MongoRepository<MGP_circuitModel, String>{
    Optional<MGP_circuitModel> findBycircuitID(String circuitID);
    List<MGP_circuitModel> findBycircuitName(String circuitName);
}
