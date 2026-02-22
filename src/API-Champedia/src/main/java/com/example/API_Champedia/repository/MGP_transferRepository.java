package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_transferModel;

public interface MGP_transferRepository extends MongoRepository<MGP_transferModel, String> {
    List<MGP_transferModel> findByriderID(String riderID);
}
