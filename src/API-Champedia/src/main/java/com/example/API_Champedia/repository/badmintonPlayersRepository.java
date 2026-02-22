package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.badminton_playersModel;

public interface badmintonPlayersRepository extends MongoRepository<badminton_playersModel, String> {

    badminton_playersModel findByPlayerId(String playerId);

    List<badminton_playersModel> findByPlayerName(String playerName);
}
