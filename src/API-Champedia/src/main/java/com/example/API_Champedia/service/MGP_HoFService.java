package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.MGP_HoFModel;
import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.repository.MGP_HoFRepository;
import com.example.API_Champedia.repository.MGP_riderRepository;

@Service
public class MGP_HoFService {
    
    @Autowired
    private MGP_riderRepository riderRepository;

    @Autowired
    private MGP_HoFRepository MGP_HoFRepository;

    //Constructor
    public MGP_HoFService(MGP_HoFRepository MGP_HoFRepository, MGP_riderRepository riderRepository) {
        this.MGP_HoFRepository = MGP_HoFRepository;
        this.riderRepository = riderRepository;
    }

    //Get all
    public List<MGP_HoFModel> getAllMGP_HoF() {
        return MGP_HoFRepository.findAll();
    }

    //Get all by ID
    public MGP_HoFModel getMGP_HoFById(String hofID) {
        Optional<MGP_HoFModel> MGP_HoF = MGP_HoFRepository.findById(hofID);
        return MGP_HoF.orElse(null);
    }

    //Create
    public MGP_HoFModel saveHOF(MGP_HoFModel HoF) {

        //Find the rider based on ID
        MGP_riderModel rider = riderRepository
                .findById(HoF.getRiderID())
                .orElseThrow(() ->
                    new RuntimeException("Rider not found"));

        //Check the existing of rider
        if (MGP_HoFRepository.existsByRiderID(rider.getrId())) {
            throw new RuntimeException("Rider with ID '" + rider.getrId() + "' already exists");
        }

        //Take riderName fron riderID
        HoF.setRiderName(rider.getrName());
        HoF.setRiderNationality(rider.getrNationality());

        return MGP_HoFRepository.save(HoF);
    }

    //Update
    public MGP_HoFModel updateHOF(String hofID, MGP_HoFModel HoF) {

        //Check HoF exists
        MGP_HoFModel existing_HOF = MGP_HoFRepository
                .findById(hofID)
                .orElseThrow(() -> new RuntimeException("MGP HoF not found with ID: " + hofID));

        //Find the rider based on ID
        MGP_riderModel rider = riderRepository
                .findById(HoF.getRiderID())
                .orElseThrow(() ->
                    new RuntimeException("Rider not found"));

        //Check the existing of rider
        if (MGP_HoFRepository.existsByRiderIDAndHofIDNot(rider.getrId(), hofID)) {
            throw new RuntimeException("Rider with ID '" + rider.getrId() + "' already exists");
        }

        //Take riderName fron riderID
        HoF.sethofID(hofID);
        HoF.setRiderName(rider.getrName());
        HoF.setRiderNationality(rider.getrNationality());

        return MGP_HoFRepository.save(HoF);
    }

    //Delete
    public void deleteHOF(String hofID) {
        MGP_HoFRepository.deleteById(hofID);
    }
}
