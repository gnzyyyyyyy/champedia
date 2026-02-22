package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.CR_Players_Model;
import com.example.API_Champedia.service.CR_Players_Service;


@RestController
@RequestMapping("/cr_players")
@CrossOrigin("*")
public class CR_Players_Controller {
    @Autowired
    private CR_Players_Service playerService;

    // Get All
    @GetMapping
    public List<CR_Players_Model> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    // Get by ID
    @GetMapping("/{id}")
    public CR_Players_Model getPlayerById(@PathVariable String id) {
        return playerService.getPlayerById(id);
    }

    // Create
    @PostMapping
    public ResponseEntity<?> addPlayer(@RequestBody CR_Players_Model player) {
        try {
            CR_Players_Model newPlayer = playerService.addPlayer(player);
            return ResponseEntity.ok(newPlayer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    //update
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeam(@PathVariable String id, @RequestBody CR_Players_Model playerData) {
        try {
            CR_Players_Model updatedPlayer = playerService.updateTeam(id, playerData);
            if (updatedPlayer == null) {
                return ResponseEntity.status(400).body("Player not found");
            }
            return ResponseEntity.ok(updatedPlayer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable String id) {
        playerService.deletePlayer(id);
    }

    // < -- Addition -- > //
    // Get by Region
    @GetMapping("/region/{region}")
    public List<CR_Players_Model> getPlayersByRegion(@PathVariable String region) {
        return playerService.getPlayersByRegion(region);
    }
}
