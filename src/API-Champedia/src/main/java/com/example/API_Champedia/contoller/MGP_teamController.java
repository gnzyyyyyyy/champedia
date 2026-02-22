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

import com.example.API_Champedia.dto.MGP_teamDTO;
import com.example.API_Champedia.model.MGP_teamModel;
import com.example.API_Champedia.service.MGP_teamService;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the React app
public class MGP_teamController {

    private final MGP_teamService teamService;

    public MGP_teamController(MGP_teamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<MGP_teamDTO> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public MGP_teamDTO getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id);
    }

    @PostMapping
    public MGP_teamDTO createTeam(@RequestBody MGP_teamModel team) {
        return teamService.saveTeam(team);
    }

    @PutMapping("/{id}")
    public MGP_teamDTO updateTeam(@PathVariable String id, @RequestBody MGP_teamModel team) {
        return teamService.updateTeam(id, team);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable String id) {
        teamService.deleteTeam(id);
    }
}