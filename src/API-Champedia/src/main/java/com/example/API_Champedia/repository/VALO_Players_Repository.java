package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.VALO_Players_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VALO_Players_Repository extends MongoRepository<VALO_Players_Model, String>{
    List<VALO_Players_Model> findByPlayerRegion(String playerRegion);
}
