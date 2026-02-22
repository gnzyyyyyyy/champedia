package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.MLBB_Players_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MLBB_Players_Repository extends MongoRepository<MLBB_Players_Model, String>{
    List<MLBB_Players_Model> findByPlayerRegion(String playerRegion);
}
