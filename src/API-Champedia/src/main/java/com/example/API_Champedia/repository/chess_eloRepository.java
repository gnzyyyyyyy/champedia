package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.chess_eloModel;

public interface chess_eloRepository
        extends MongoRepository<chess_eloModel, String> {

    List<chess_eloModel> findByPlayerName(String playerName);
    List<chess_eloModel> findByActive(boolean active);
    List<chess_eloModel> findByTitle(String title);
}
