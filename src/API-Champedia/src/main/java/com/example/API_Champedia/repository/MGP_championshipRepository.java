package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.MGP_championshipModel;

public interface MGP_championshipRepository extends MongoRepository<MGP_championshipModel, String>{

    //Find standing based on the year and category
    List<MGP_championshipModel> findByCYearAndCCategory(int cYear, String cCategory);

    //Gathered all rider in the category
    List<MGP_championshipModel> findByCCategory(String cCategory);

    //List the standings based on the year
    List<MGP_championshipModel> findByCYear(int cYear);
}