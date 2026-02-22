package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.MLBB_Items_Model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MLBB_Items_Repository extends MongoRepository<MLBB_Items_Model, String> {
    List<MLBB_Items_Model> findByItemType(String itemType);
    Optional<MLBB_Items_Model> findByItemNameIgnoreCase(String itemName);
}