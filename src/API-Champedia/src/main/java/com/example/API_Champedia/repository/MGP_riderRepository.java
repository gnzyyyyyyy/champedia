package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_riderModel;

public interface MGP_riderRepository extends MongoRepository<MGP_riderModel, String> {
    MGP_riderModel findByrId(String rId);
    List<MGP_riderModel> findByrName(String rName);
}
