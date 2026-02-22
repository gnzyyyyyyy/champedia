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

import com.example.API_Champedia.model.VALO_Tours_Model;
import com.example.API_Champedia.service.VALO_Tours_Service;

@RestController
@RequestMapping("/valo_tours")
@CrossOrigin("*")
public class VALO_Tours_Controller {
    @Autowired
    private VALO_Tours_Service tourService;

    // Get All
    @GetMapping
    public List<VALO_Tours_Model> getAllTours() {
        return tourService.getAllTour();
    }

    // Get by ID
    @GetMapping("/{id}")
    public VALO_Tours_Model getTourById(@PathVariable String id) {
        return tourService.getTourById(id);
    }

    // Create
    @PostMapping
    public VALO_Tours_Model addTour(@RequestBody VALO_Tours_Model tour) {
        return tourService.addTour(tour);
    }

    // Update
    @PutMapping("/{id}")
    public VALO_Tours_Model updateTour(@PathVariable String id, @RequestBody VALO_Tours_Model tour) {
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
    public List<VALO_Tours_Model> getToursByTier(@PathVariable String tier) {
        return tourService.getToursByTier(tier);
    }
}
