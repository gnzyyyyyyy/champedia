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

import com.example.API_Champedia.model.MGP_HoFModel;
import com.example.API_Champedia.service.MGP_HoFService;

@RestController
@RequestMapping("/MGP_HoF")
@CrossOrigin("http://localhost:3000")
public class MGP_HoFController {
    
    @Autowired
    private MGP_HoFService MGP_HoFService;

    //Constructor
    public MGP_HoFController(MGP_HoFService MGP_HoFService) {
        this.MGP_HoFService = MGP_HoFService;
    }

    //Get all
    @GetMapping
    public List<MGP_HoFModel> getAllMGP_HoF() {
        return MGP_HoFService.getAllMGP_HoF();
    }

    //Get all by ID
    @GetMapping("/{id}")
    public MGP_HoFModel getMGP_HoFById(@PathVariable String id) {
        return MGP_HoFService.getMGP_HoFById(id);
    }

    //Create
    @PostMapping
    public MGP_HoFModel saveHOF(@RequestBody MGP_HoFModel HoF) {
        return MGP_HoFService.saveHOF(HoF);
    }

    //Update
    @PutMapping("/{id}")
    public MGP_HoFModel updateHOF(@PathVariable String id, @RequestBody MGP_HoFModel HoF) {
        return MGP_HoFService.updateHOF(id, HoF);
    }

    //Delete
    @DeleteMapping("/{id}")
    public void deleteHOF(@PathVariable String id) {
        MGP_HoFService.deleteHOF(id);
    }
}
