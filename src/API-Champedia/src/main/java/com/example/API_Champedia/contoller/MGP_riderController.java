package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.service.MGP_riderService;

@RestController
@RequestMapping("/rider")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the React app
public class MGP_riderController {

    private MGP_riderService riderService;

    // Constructor
    public MGP_riderController(MGP_riderService riderService) {
        this.riderService = riderService;
    }

    //Get All Riders
    @GetMapping
    public List<MGP_riderModel> getAllRiders() {
        return riderService.getAllRiders();
    }

    //Get rider by ID
    @GetMapping("/{id}")
    public MGP_riderModel getRider(@PathVariable String id) {
        return riderService.getRiderById(id);
    }

    //Create a rider (POST)
    @PostMapping
    public MGP_riderModel createRider(@RequestBody MGP_riderModel riderModel) {
        return riderService.saveRider(riderModel);
    }

    //Update a rider (PUT)
    @PutMapping("/{id}")
    public MGP_riderModel updateRider(@PathVariable String id, @RequestBody MGP_riderModel riderModel) {
        return riderService.updateRider(id, riderModel);
    }

    //Delete a rider (DELETE)
    @DeleteMapping("/{id}")
    public void deleteRider(@PathVariable String id) {
        riderService.deleteRider(id);
    }
}