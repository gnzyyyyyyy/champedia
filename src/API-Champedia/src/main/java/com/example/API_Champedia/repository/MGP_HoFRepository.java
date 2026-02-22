package com.example.API_Champedia.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_HoFModel;

public interface MGP_HoFRepository extends MongoRepository<MGP_HoFModel, String> {
    boolean existsByRiderID(String riderID);

    boolean existsByRiderIDAndHofIDNot(String riderID, String hofID);
}
