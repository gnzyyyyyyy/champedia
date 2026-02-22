package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.chess_eloModel;
import com.example.API_Champedia.repository.chess_eloRepository;

@Service
public class chess_eloService {

    private chess_eloRepository chessEloRepository;

    // Constructor
    public chess_eloService(chess_eloRepository chessEloRepository) {
        this.chessEloRepository = chessEloRepository;
    }

    // GET ALL
    public List<chess_eloModel> getAllElo() {
        return chessEloRepository.findAll();
    }

    // GET BY ID
    public chess_eloModel getEloById(String id) {
        Optional<chess_eloModel> elo = chessEloRepository.findById(id);
        return elo.orElse(null);
    }

    // SAVE
    public chess_eloModel saveElo(chess_eloModel player) {

        // ❗ cek apakah playerName sudah ada
        List<chess_eloModel> existing =
                chessEloRepository.findByPlayerName(player.getPlayerName());

        if (!existing.isEmpty()) {
            throw new RuntimeException(
                "Player name '" + player.getPlayerName() + "' already exists"
            );
        }

        // biarkan playerId null → Mongo generate otomatis
        return chessEloRepository.save(player);
    }

    // UPDATE
    public chess_eloModel updateElo(String id, chess_eloModel player) {

        List<chess_eloModel> existing =
                chessEloRepository.findByPlayerName(player.getPlayerName());

        if (!existing.isEmpty()) {
            chess_eloModel sameName = existing.get(0);

            // kalau nama dipakai player lain → tolak
            if (!sameName.getPlayerId().equals(id)) {
                throw new RuntimeException(
                    "Player name '" + player.getPlayerName()
                    + "' already used by another player"
                );
            }
        }

        player.setPlayerId(id);
        return chessEloRepository.save(player);
    }

    // DELETE
    public void deleteElo(String id) {
        chessEloRepository.deleteById(id);
    }

    // FILTER
    public List<chess_eloModel> getActivePlayers() {
        return chessEloRepository.findByActive(true);
    }

    public List<chess_eloModel> getByTitle(String title) {
        return chessEloRepository.findByTitle(title);
    }
}
