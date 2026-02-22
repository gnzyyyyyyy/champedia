package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_nextRaceModel;

public interface MGP_nextRaceRepository extends MongoRepository<MGP_nextRaceModel, String> {
    public List<MGP_nextRaceModel> findByraceDate(String raceDate);
}
