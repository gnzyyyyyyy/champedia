package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_teamModel;

public interface MGP_teamRepository extends MongoRepository<MGP_teamModel, String> {
    MGP_teamModel findBytId(String tId);
    List<MGP_teamModel> findBytName(String tName);
}
