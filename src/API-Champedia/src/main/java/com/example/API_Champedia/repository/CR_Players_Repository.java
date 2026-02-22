package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Players_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CR_Players_Repository extends MongoRepository<CR_Players_Model, String>{
    List<CR_Players_Model> findByPlayerRegion(String playerRegion);
}
