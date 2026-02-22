package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Cards_Model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CR_Cards_Repository extends MongoRepository<CR_Cards_Model, String> {

    List<CR_Cards_Model> findByCardType(String cardType);

    List<CR_Cards_Model> findByCardRarity(String cardRarity);

    Optional<CR_Cards_Model> findByCardNameIgnoreCase(String cardName);
}

