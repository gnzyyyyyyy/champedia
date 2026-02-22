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

import com.example.API_Champedia.dto.MGP_championshipDTO;
import com.example.API_Champedia.model.MGP_championshipModel;
import com.example.API_Champedia.service.MGP_championshipService;

@RestController
@RequestMapping("/championship")
@CrossOrigin("http://localhost:3000")
public class MGP_championshipController {

    private final MGP_championshipService championshipService;

    //Constructor
    public MGP_championshipController(MGP_championshipService championshipService) {
        this.championshipService = championshipService;
    }

    //Get all championships
    @GetMapping
    public List<MGP_championshipModel> getAllChampionships() {
        return championshipService.getAllChampionships();
    }

    //Get championship by ID
    @GetMapping("/{id}")
    public MGP_championshipModel getChampionship(@PathVariable String id) {
        return championshipService.getChampionship(id);
    }

    //Post new championship
    @PostMapping
    public MGP_championshipModel createChampionship(@RequestBody MGP_championshipModel cModel) {
        return championshipService.createChampionship(cModel);
    }

    //Add one rider into the existing championship
    @PostMapping("/{id}/addrider")
    public MGP_championshipModel addRiderToChampionship(
            @PathVariable String id,
            @RequestBody MGP_championshipDTO dto
    ) {
        return championshipService.addRider(id, dto);
    }

    //update championship
    @PutMapping("/{id}")
    public MGP_championshipModel updateChampionship(
            @PathVariable String id,
            @RequestBody MGP_championshipModel cModel) {

        return championshipService.updateChampionship(id, cModel);
    }

    //Delete
    @DeleteMapping("/{id}")
    public void deleteChampionship(@PathVariable String id) {
        championshipService.deleteChampionship(id);
    }
}
