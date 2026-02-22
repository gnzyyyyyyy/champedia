package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.MLBB_Tours_Model;
import com.example.API_Champedia.service.MLBB_Tours_Service;

@RestController
@RequestMapping("/mlbb_tours")
@CrossOrigin("*")
public class MLBB_Tours_Controller {
    @Autowired
    private MLBB_Tours_Service tourService;

    // Get All
    @GetMapping
    public List<MLBB_Tours_Model> getAllTours() {
        return tourService.getAllTour();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MLBB_Tours_Model getTourById(@PathVariable String id) {
        return tourService.getTourById(id);
    }

    // Create
    @PostMapping
    public MLBB_Tours_Model addTour(@RequestBody MLBB_Tours_Model tour) {
        return tourService.addTour(tour);
    }

    // Update
    @PutMapping("/{id}")
    public MLBB_Tours_Model updateTour(@PathVariable String id, @RequestBody MLBB_Tours_Model tour) {
        return tourService.updateTour(id, tour);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable String id) {
        tourService.deleteTour(id);
    }

    // < -- ADDITION -- > //
    // Get Tour by Tier
    @GetMapping("/tier/{tier}")
    public List<MLBB_Tours_Model> getToursByTier(@PathVariable String tier) {
        return tourService.getToursByTier(tier);
    }
}
