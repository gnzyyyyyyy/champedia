package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.PUBG_Players_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PUBG_Players_Repository extends MongoRepository<PUBG_Players_Model, String>{
    List<PUBG_Players_Model> findByPlayerRegion(String playerRegion);
}
