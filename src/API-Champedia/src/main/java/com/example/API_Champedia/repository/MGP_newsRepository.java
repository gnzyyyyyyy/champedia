package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_newsModel;

public interface MGP_newsRepository extends MongoRepository<MGP_newsModel, String> {
    public List<MGP_newsModel> findBynewsTitle(String newsTitle);
}
