package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Hero_Model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CR_Hero_Repository extends MongoRepository<CR_Hero_Model, String> {

    List<CR_Hero_Model> findByCardType(String cardType);

    List<CR_Hero_Model> findByCardRarity(String cardRarity);

    Optional<CR_Hero_Model> findByCardNameIgnoreCase(String cardName);
}


