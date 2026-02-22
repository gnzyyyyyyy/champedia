package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_highlightModel;

public interface MGP_highlightRepository extends MongoRepository<MGP_highlightModel, String> {
    public List<MGP_highlightModel> findByhighlightTitle(String highlightTitle);
}
