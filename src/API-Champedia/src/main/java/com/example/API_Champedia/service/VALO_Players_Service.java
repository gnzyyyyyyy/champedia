package com.example.API_Champedia.service;

import com.example.API_Champedia.model.VALO_Players_Model;
import com.example.API_Champedia.repository.VALO_Players_Repository;
import com.example.API_Champedia.repository.VALO_Teams_Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VALO_Players_Service {

    @Autowired
    private VALO_Players_Repository playerRepository;

    @Autowired
    private VALO_Teams_Repository teamRepository;

    // Get All
    public List<VALO_Players_Model> getAllPlayers() {
        return playerRepository.findAll();
    }

    // Get by ID
    public VALO_Players_Model getPlayerById(String id) {
        Optional<VALO_Players_Model> player = playerRepository.findById(id);
        return player.orElse(null);
    }

    // Add Player
    public VALO_Players_Model addPlayer(VALO_Players_Model player) {
        if (player.getTeamID() != null && !player.getTeamID().isBlank()) {
            boolean exists = teamRepository.existsById(player.getTeamID());
            if (!exists) {
                throw new IllegalArgumentException("Team ID does not exist");
            }
        } else {
            player.setTeamID(null);
        }

        return playerRepository.save(player);
    }

    // Update
    public VALO_Players_Model updateTeam(String id, VALO_Players_Model playerData) {
        Optional<VALO_Players_Model> existingPlayer = playerRepository.findById(id);

        if(existingPlayer.isPresent()) {
            VALO_Players_Model player = existingPlayer.get();

            player.setPlayerIGN(playerData.getPlayerIGN());
            player.setPlayerName(playerData.getPlayerName());
            player.setPlayerRole(playerData.getPlayerRole());
            player.setPlayerRegion(playerData.getPlayerRegion());
            player.setPlayerCountry(playerData.getPlayerCountry());
            player.setCountry_flag(playerData.getCountry_flag());

            String teamID = playerData.getTeamID();
            if (teamID != null && !teamID.isBlank()) {
                boolean exists = teamRepository.existsById(teamID);
                if (!exists) {
                    throw new IllegalArgumentException("Team ID does not exist");
                }
                player.setTeamID(teamID);
            } else {
                player.setTeamID(null);
            }

            return playerRepository.save(player);
        }

        return null;
    }

    //Delete
    public boolean deletePlayer(String id) {
        if (playerRepository.existsById(id)) {
            playerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // < -- Addition --> //
    // Get by Region
    public List<VALO_Players_Model> getPlayersByRegion(String region) {
        return playerRepository.findByPlayerRegion(region);
    }
}