package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.chessPlayerModel;
import com.example.API_Champedia.repository.chessPlayerRepository;

@Service
public class chessPlayerService {

    private chessPlayerRepository chessPlayerRepository;

    // Constructor
    public chessPlayerService(chessPlayerRepository chessPlayerRepository) {
        this.chessPlayerRepository = chessPlayerRepository;
    }

    // GET ALL
    public List<chessPlayerModel> getAllPlayers() {
        return chessPlayerRepository.findAll();
    }

    // GET BY ID
    public chessPlayerModel getPlayerById(String id) {
        Optional<chessPlayerModel> player =
                chessPlayerRepository.findById(id);
        return player.orElse(null);
    }

    // SAVE
    public chessPlayerModel savePlayer(chessPlayerModel player) {

        // ❗ cek apakah nama player sudah ada
        List<chessPlayerModel> existing =
                chessPlayerRepository.findByName(player.getName());

        if (!existing.isEmpty()) {
            throw new RuntimeException(
                "Player name '" + player.getName() + "' already exists"
            );
        }

        // biarkan playerId null → Mongo generate otomatis
        return chessPlayerRepository.save(player);
    }

    // UPDATE
    public chessPlayerModel updatePlayer(String id, chessPlayerModel player) {

        List<chessPlayerModel> existing =
                chessPlayerRepository.findByName(player.getName());

        if (!existing.isEmpty()) {
            chessPlayerModel sameName = existing.get(0);

            // kalau nama dipakai player lain → tolak
            if (!sameName.getPlayerId().equals(id)) {
                throw new RuntimeException(
                    "Player name '" + player.getName()
                    + "' already used by another player"
                );
            }
        }

        player.setPlayerId(id);
        return chessPlayerRepository.save(player);
    }

    // DELETE
    public void deletePlayer(String id) {
        chessPlayerRepository.deleteById(id);
    }
}
