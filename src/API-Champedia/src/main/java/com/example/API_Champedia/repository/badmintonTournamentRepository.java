package com.example.API_Champedia.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.API_Champedia.model.badminton_tournamentModel;

public interface badmintonTournamentRepository extends MongoRepository<badminton_tournamentModel, String> {

    List<badminton_tournamentModel> findByStatus(String status);
    List<badminton_tournamentModel> findByName(String name);
}
