package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.CR_Evo_Model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CR_Evo_Repository extends MongoRepository<CR_Evo_Model, String> {

    List<CR_Evo_Model> findByCardType(String cardType);

    List<CR_Evo_Model> findByCardRarity(String cardRarity);

    Optional<CR_Evo_Model> findByCardNameIgnoreCase(String cardName);
}

