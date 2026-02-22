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

import com.example.API_Champedia.model.badminton_playersModel;
import com.example.API_Champedia.service.badmintonPlayersService;

@RestController
@RequestMapping("/badminton/players")
@CrossOrigin(origins = "http://localhost:3000")
public class badmintonPlayersController {

    private badmintonPlayersService badmintonService;

    // Constructor
    public badmintonPlayersController(badmintonPlayersService badmintonService) {
        this.badmintonService = badmintonService;
    }

    // Get all players
    @GetMapping
    public List<badminton_playersModel> getAllPlayers() {
        return badmintonService.getAllPlayers();
    }

    // Get player by ID
    @GetMapping("/{id}")
    public badminton_playersModel getPlayer(@PathVariable String id) {
        return badmintonService.getPlayerById(id);
    }

    // Create a new player (POST)
    @PostMapping
    public badminton_playersModel createPlayer(@RequestBody badminton_playersModel player) {
        return badmintonService.savePlayer(player);
    }

    // Update a player (PUT)
    @PutMapping("/{id}")
    public badminton_playersModel updatePlayer(@PathVariable String id,
                                               @RequestBody badminton_playersModel player) {
        return badmintonService.updatePlayer(id, player);
    }

    // Delete a player (DELETE)
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable String id) {
        badmintonService.deletePlayer(id);
    }
}
