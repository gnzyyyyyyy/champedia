package com.example.API_Champedia.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Champedia.model.badminton_equipmentModel;

public interface badminton_equipmentRepository
        extends MongoRepository<badminton_equipmentModel, String> {

    List<badminton_equipmentModel> findByType(String type);
    List<badminton_equipmentModel> findByBrand(String brand);
    List<badminton_equipmentModel> findByName(String name);
}
