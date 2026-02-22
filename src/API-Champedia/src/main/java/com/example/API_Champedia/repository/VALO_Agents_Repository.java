package com.example.API_Champedia.repository;

import com.example.API_Champedia.model.VALO_Agents_Model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VALO_Agents_Repository extends MongoRepository<VALO_Agents_Model, String> {
    List<VALO_Agents_Model> findByAgentRole(String agentRole);
    Optional<VALO_Agents_Model> findByAgentNameIgnoreCase(String agentName);
}

