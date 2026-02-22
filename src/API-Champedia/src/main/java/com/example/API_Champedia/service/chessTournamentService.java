package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.chessTournamentModel;
import com.example.API_Champedia.repository.chessTournamentRepository;

@Service
public class chessTournamentService {

    private chessTournamentRepository chessTournamentRepository;

    // Constructor
    public chessTournamentService(chessTournamentRepository chessTournamentRepository) {
        this.chessTournamentRepository = chessTournamentRepository;
    }

    // GET ALL
    public List<chessTournamentModel> getAll() {
        return chessTournamentRepository.findAll();
    }

    // GET BY ID
    public chessTournamentModel getById(String id) {
        Optional<chessTournamentModel> t =
                chessTournamentRepository.findById(id);
        return t.orElse(null);
    }

    // CREATE
    public chessTournamentModel create(chessTournamentModel tournament) {

        List<chessTournamentModel> existing =
                chessTournamentRepository.findByName(
                        tournament.getName()
                );

        if (!existing.isEmpty()) {
            throw new RuntimeException(
                "Tournament name '" + tournament.getName() + "' already exists"
            );
        }

        return chessTournamentRepository.save(tournament);
    }

    // UPDATE
    public chessTournamentModel update(String id, chessTournamentModel tournament) {

        List<chessTournamentModel> existing =
                chessTournamentRepository.findByName(
                        tournament.getName()
                );

        if (!existing.isEmpty()) {
            chessTournamentModel sameName = existing.get(0);

            // kalau nama dipakai tournament lain → tolak
            if (!sameName.getTournamentId().equals(id)) {
                throw new RuntimeException(
                    "Tournament name '" + tournament.getName()
                    + "' already used by another tournament"
                );
            }
        }

        tournament.setTournamentId(id);
        return chessTournamentRepository.save(tournament);
    }

    // DELETE
    public void delete(String id) {
        chessTournamentRepository.deleteById(id);
    }

    // FILTER
    public List<chessTournamentModel> getPast() {
        return chessTournamentRepository.findByStatus("past");
    }

    public List<chessTournamentModel> getUpcoming() {
        return chessTournamentRepository.findByStatus("upcoming");
    }
}
