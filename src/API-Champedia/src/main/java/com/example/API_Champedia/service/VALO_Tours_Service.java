package com.example.API_Champedia.service;

import com.example.API_Champedia.model.VALO_Tours_Model;
import com.example.API_Champedia.repository.VALO_Tours_Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VALO_Tours_Service {
    
    @Autowired
    private VALO_Tours_Repository tourRepository;

    // Get All
    public List<VALO_Tours_Model> getAllTour() {
        return tourRepository.findAll();
    }

    // Get by ID
    public VALO_Tours_Model getTourById(String id) {
        Optional<VALO_Tours_Model> tour = tourRepository.findById(id);
        return tour.orElse(null);
    }

    // Add tour
    public VALO_Tours_Model addTour(VALO_Tours_Model tour) {
        return tourRepository.save(tour);
    }

    // update
    public VALO_Tours_Model updateTour(String id, VALO_Tours_Model tourData) {
        Optional<VALO_Tours_Model> existingTour = tourRepository.findById(id);

        if(existingTour.isPresent()) {
            VALO_Tours_Model tour = existingTour.get();

            tour.setTourLogo(tourData.getTourLogo());
            tour.setTourName(tourData.getTourName());
            tour.setTourTier(tourData.getTourTier());
            tour.setTourRegion(tourData.getTourRegion());
            tour.setTourLocation(tourData.getTourLocation());
            tour.setTourDates(tourData.getTourDates());
            tour.setTourPrizePool(tourData.getTourPrizePool());

            return tourRepository.save(tour);
        }

        return null;
    }

    //Delete
    public boolean deleteTour(String id) {
        if (tourRepository.existsById(id)) {
            tourRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // < -- ADDITION --> //
    // Get Tour by Tier
    public List<VALO_Tours_Model> getToursByTier(String tier) {
        return tourRepository.findByTourTier(tier);
    }
}
