package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.chessPlayerModel;

public interface chessPlayerRepository
        extends MongoRepository<chessPlayerModel, String> {

    List<chessPlayerModel> findByName(String name);
}
