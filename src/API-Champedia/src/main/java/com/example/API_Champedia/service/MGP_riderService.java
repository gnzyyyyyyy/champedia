package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.repository.MGP_riderRepository;

@Service
public class MGP_riderService {
    
    private MGP_riderRepository riderRepository; 

    //Constructor
    public MGP_riderService(MGP_riderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    //Print all data
    public List<MGP_riderModel> getAllRiders() {
        return riderRepository.findAll();
    }

    //Print rider by ID
    public MGP_riderModel getRiderById(String id) {
        Optional<MGP_riderModel> rider = riderRepository.findById(id);
        return rider.orElse(null);
    }

    //Save rider
    public MGP_riderModel saveRider(MGP_riderModel rider) {

        // Cek apakah nama rider sudah ada
        List<MGP_riderModel> existing = riderRepository.findByrName(rider.getrName());
        if (!existing.isEmpty()) {
            throw new RuntimeException("Rider name '" + rider.getrName() + "' already exists");
        }

        // rId biarkan null supaya MongoDB generate otomatis
        return riderRepository.save(rider);
    }

    //Update rider
    public MGP_riderModel updateRider(String id, MGP_riderModel rider) {

        List<MGP_riderModel> existing = riderRepository.findByrName(rider.getrName());

        if (!existing.isEmpty()) {
            // Ambil data existing (karena mungkin ada satu)
            MGP_riderModel sameName = existing.get(0);

            // Jika nama dipakai rider lain → tolak
            if (!sameName.getrId().equals(id)) {
                throw new RuntimeException("Rider name '" + rider.getrName() + "' already used by another rider");
            }
        }

        rider.setrId(id);
        return riderRepository.save(rider);
    }

    //Delete rider
    public void deleteRider(String id) {
        riderRepository.deleteById(id);
    }
}