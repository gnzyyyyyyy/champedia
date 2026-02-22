package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.MLBB_Heroes_Model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MLBB_Heroes_Repository extends MongoRepository<MLBB_Heroes_Model, String> {
    List<MLBB_Heroes_Model> findByHeroRole(String heroRole);
    Optional<MLBB_Heroes_Model> findByHeroNameIgnoreCase(String heroName);
}
