package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.MGP_circuitModel;
import com.example.API_Champedia.model.MGP_nextRaceModel;
import com.example.API_Champedia.repository.MGP_circuitRepository;
import com.example.API_Champedia.repository.MGP_nextRaceRepository;


@Service
public class MGP_nextRaceService {
    
    @Autowired
    private MGP_nextRaceRepository MGP_nextRaceRepository;

    @Autowired
    private MGP_circuitRepository circuitRepository;

    public MGP_nextRaceService(MGP_nextRaceRepository MGP_nextRaceRepository, MGP_circuitRepository circuitRepository) {
        this.MGP_nextRaceRepository = MGP_nextRaceRepository;
        this.circuitRepository = circuitRepository;
    }

    //Get all
    public List<MGP_nextRaceModel> getAllNextRaces() {
        return MGP_nextRaceRepository.findAll();
    }

    //Get by ID
    public MGP_nextRaceModel getNextRace(String raceID) {
        Optional<MGP_nextRaceModel> nextRace = MGP_nextRaceRepository.findById(raceID);
        return nextRace.orElse(null);
    }

    //create
    public MGP_nextRaceModel createNextRace(MGP_nextRaceModel nextRace) {

        // Check race date
        List<MGP_nextRaceModel> raceExisting =
                MGP_nextRaceRepository.findByraceDate(nextRace.getRaceDate());

        if (!raceExisting.isEmpty()) {
            throw new RuntimeException(
                "Next race date '" + nextRace.getRaceDate() + "' already exists"
            );
        }

        // Ambil circuitID dari body
        MGP_circuitModel circuit = circuitRepository
                .findBycircuitID(nextRace.getCircuitID())
                .orElseThrow(() -> new RuntimeException("Circuit not found"));

        nextRace.setRaceCircuit(circuit.getCircuitName());

        return MGP_nextRaceRepository.save(nextRace);
    }


    //Update
    public MGP_nextRaceModel updateNextRace(String raceID, MGP_nextRaceModel nextRace) {

        MGP_nextRaceModel existingRace = MGP_nextRaceRepository.findById(raceID)
                .orElseThrow(() -> new RuntimeException("Next race not found"));

        // Check date (exclude self)
        List<MGP_nextRaceModel> raceExisting =
                MGP_nextRaceRepository.findByraceDate(nextRace.getRaceDate());

        boolean dateUsedByOthers = raceExisting.stream()
                .anyMatch(r -> !r.getRaceID().equals(raceID));

        if (dateUsedByOthers) {
            throw new RuntimeException(
                "Next race date '" + nextRace.getRaceDate() + "' already exists"
            );
        }

        MGP_circuitModel circuit = circuitRepository
                .findBycircuitID(nextRace.getCircuitID())
                .orElseThrow(() -> new RuntimeException("Circuit not found"));

        existingRace.setRaceDate(nextRace.getRaceDate());
        existingRace.setRaceTitle(nextRace.getRaceTitle());
        existingRace.setRaceCircuit(circuit.getCircuitName());
        existingRace.setRacePhoto(nextRace.getRacePhoto());
        existingRace.setCircuitID(nextRace.getCircuitID());

        return MGP_nextRaceRepository.save(existingRace);
    }

    //Delete
    public void deleteNextRace(String raceID) {
        MGP_nextRaceRepository.deleteById(raceID);
    }
}

