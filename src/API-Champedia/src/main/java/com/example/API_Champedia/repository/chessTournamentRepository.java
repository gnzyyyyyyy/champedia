package com.example.API_Champedia.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.chessTournamentModel;

public interface chessTournamentRepository
        extends MongoRepository<chessTournamentModel, String> {

    List<chessTournamentModel> findByName(String name);
    List<chessTournamentModel> findByStatus(String status);
}
