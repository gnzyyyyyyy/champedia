package com.example.API_Champedia.service;

import com.example.API_Champedia.model.VALO_Teams_Model;
import com.example.API_Champedia.repository.VALO_Teams_Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VALO_Teams_Service {

    @Autowired
    private VALO_Teams_Repository teamRepository;

    //Get All
    public List<VALO_Teams_Model> getAllTeams(){
        return teamRepository.findAll();
    }

    //Get By Id
    public VALO_Teams_Model getTeamById(String id){
        Optional<VALO_Teams_Model> team = teamRepository.findById(id);
        return team.orElse(null);
    }

    //Create
    public VALO_Teams_Model addTeam(VALO_Teams_Model team){
        return teamRepository.save(team);
    }

    //Update
    public VALO_Teams_Model updateTeam(String id, VALO_Teams_Model teamData){
        Optional<VALO_Teams_Model> existingTeam = teamRepository.findById(id);

        if (existingTeam.isPresent()) {
            VALO_Teams_Model team = existingTeam.get();
    
            team.setTeamName(teamData.getTeamName());
            team.setTeamNickname(teamData.getTeamNickname());
            team.setTeamLogo(teamData.getTeamLogo());
            team.setTeamRegion(teamData.getTeamRegion());
            team.setTeamCountry(teamData.getTeamCountry());
            team.setTeamStatus(teamData.getTeamStatus());
    
            return teamRepository.save(team);
        }
    
        return null;
    }

    //Delete
    public boolean deleteTeam(String id){
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // <-- Addition --> //
    // Get Team by Region
    public List<VALO_Teams_Model> getTeamsByRegion(String region) {
        return teamRepository.findByTeamRegion(region);
    }

    // Get Countries by Region
    public List<String> getCountriesByRegion(String region) {
    return teamRepository.findCountriesByRegion(region).stream().map(VALO_Teams_Model::getTeamCountry).distinct().toList();
    }

    // Get Team by Country
    public List<VALO_Teams_Model> getTeamsByCountry(String country) {
        return teamRepository.findByTeamCountry(country);
    }
}


