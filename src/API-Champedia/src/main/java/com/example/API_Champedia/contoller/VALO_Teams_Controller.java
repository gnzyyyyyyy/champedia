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

import com.example.API_Champedia.model.VALO_Teams_Model;
import com.example.API_Champedia.service.VALO_Teams_Service;

@RestController
@RequestMapping("/valo_teams")
@CrossOrigin(origins = "*")
public class VALO_Teams_Controller {
    @Autowired
    private VALO_Teams_Service teamService;

    //Get All
    @GetMapping
    public List<VALO_Teams_Model> getAllTeams() {
        return teamService.getAllTeams();
    }

    // Get By ID
    @GetMapping("/{id}")
    public VALO_Teams_Model getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id);
    }

    // CREATE
    @PostMapping
    public VALO_Teams_Model addTeam(@RequestBody VALO_Teams_Model team) {
        return teamService.addTeam(team);
    }

    // UPDATE
    @PutMapping("/{id}")
    public VALO_Teams_Model updateTeam(@PathVariable String id, @RequestBody VALO_Teams_Model teamData) {
        return teamService.updateTeam(id, teamData);
    }

    // Delete
    @DeleteMapping("/{id}")
    public boolean deleteTeam(@PathVariable String id) {
        return teamService.deleteTeam(id);
    }

    // < -- Addition --> //
    // Get Team by Region   
    @GetMapping("/region/{region}")
    public List<VALO_Teams_Model> getTeamsByRegion(@PathVariable String region) {
        return teamService.getTeamsByRegion(region);
    }

    // Get Countries Inside Region
    @GetMapping("/region/{region}/countries")
    public List<String> getCountriesByRegion(@PathVariable String region) {
        return teamService.getCountriesByRegion(region);
    }

    // Get Team by Country
    @GetMapping("/country/{country}")
    public List<VALO_Teams_Model> getTeamsByCountry(@PathVariable String country) {
        return teamService.getTeamsByCountry(country);
    }
}
