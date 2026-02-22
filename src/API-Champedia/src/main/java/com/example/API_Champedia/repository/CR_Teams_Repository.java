package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Teams_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CR_Teams_Repository extends MongoRepository<CR_Teams_Model, String> {
    List<CR_Teams_Model> findByTeamRegion(String teamRegion);
    List<CR_Teams_Model> findByTeamCountry(String teamCountry);

    @Query(value = "{'teamRegion': ?0}", fields = "{'teamCountry': 1}")
    List<CR_Teams_Model> findCountriesByRegion(String region);
}