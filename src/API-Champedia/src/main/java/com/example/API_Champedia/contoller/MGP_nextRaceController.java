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

import com.example.API_Champedia.model.MGP_nextRaceModel;
import com.example.API_Champedia.service.MGP_nextRaceService;

@RestController
@RequestMapping("/MGP_nextRace")
@CrossOrigin("http://localhost:3000")
public class MGP_nextRaceController {

    private final MGP_nextRaceService MGP_nextRaceService;

    public MGP_nextRaceController(MGP_nextRaceService MGP_nextRaceService) {
        this.MGP_nextRaceService = MGP_nextRaceService;
    }

    // Get all
    @GetMapping
    public List<MGP_nextRaceModel> getAllNextRaces() {
        return MGP_nextRaceService.getAllNextRaces();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MGP_nextRaceModel getNextRace(@PathVariable String id) {
        return MGP_nextRaceService.getNextRace(id);
    }

    // CREATE
    @PostMapping
    public MGP_nextRaceModel createNextRace(
            @RequestBody MGP_nextRaceModel nextRace
    ) {
        return MGP_nextRaceService.createNextRace(nextRace);
    }

    // UPDATE
    @PutMapping("/{id}")
    public MGP_nextRaceModel updateNextRace(
            @PathVariable String id,
            @RequestBody MGP_nextRaceModel nextRace
    ) {
        return MGP_nextRaceService.updateNextRace(id, nextRace);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteNextRace(@PathVariable String id) {
        MGP_nextRaceService.deleteNextRace(id);
    }
}
