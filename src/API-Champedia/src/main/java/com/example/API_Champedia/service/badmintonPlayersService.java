package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.badminton_playersModel;
import com.example.API_Champedia.repository.badmintonPlayersRepository;

@Service
public class badmintonPlayersService {
    
    private badmintonPlayersRepository badmintonPlayersRepository;

    // Constructor
    public badmintonPlayersService(badmintonPlayersRepository badmintonPlayersRepository) {
        this.badmintonPlayersRepository = badmintonPlayersRepository;
    }

    // Get all players
    public List<badminton_playersModel> getAllPlayers() {
        return badmintonPlayersRepository.findAll();
    }

    // Get player by ID
    public badminton_playersModel getPlayerById(String id) {
        Optional<badminton_playersModel> player = badmintonPlayersRepository.findById(id);
        return player.orElse(null);
    }

    // Save player
    public badminton_playersModel savePlayer(badminton_playersModel player) {

        // Cek apakah nama player sudah ada
        List<badminton_playersModel> existing = badmintonPlayersRepository.findByPlayerName(player.getPlayerName());
        if (!existing.isEmpty()) {
            throw new RuntimeException("Player name '" + player.getPlayerName() + "' already exists");
        }

        // Biarkan playerId NULL → MongoDB generate otomatis
        return badmintonPlayersRepository.save(player);
    }

    // Update player
    public badminton_playersModel updatePlayer(String id, badminton_playersModel player) {

        List<badminton_playersModel> existing = badmintonPlayersRepository.findByPlayerName(player.getPlayerName());

        if (!existing.isEmpty()) {
            badminton_playersModel sameName = existing.get(0);

            // Jika nama dipakai pemain lain → tolak
            if (!sameName.getPlayerId().equals(id)) {
                throw new RuntimeException("Player name '" + player.getPlayerName() + "' already used by another player");
            }
        }

        player.setPlayerId(id);
        return badmintonPlayersRepository.save(player);
    }

    // Delete player
    public void deletePlayer(String id) {
        badmintonPlayersRepository.deleteById(id);
    }
}
