package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.badminton_tournamentModel;
import com.example.API_Champedia.repository.badmintonTournamentRepository;

@Service
public class badmintonTournamentService {

    private badmintonTournamentRepository badmintonTournamentRepository;

    // Constructor
    public badmintonTournamentService(badmintonTournamentRepository badmintonTournamentRepository) {
        this.badmintonTournamentRepository = badmintonTournamentRepository;
    }

    // Get all tournaments
    public List<badminton_tournamentModel> getAllTournaments() {
        return badmintonTournamentRepository.findAll();
    }

    // Get tournament by ID
    public badminton_tournamentModel getTournamentById(String id) {
        Optional<badminton_tournamentModel> tournament =
                badmintonTournamentRepository.findById(id);
        return tournament.orElse(null);
    }

    // Create tournament
    public badminton_tournamentModel createTournament(badminton_tournamentModel tournament) {

        // ❗ cek apakah nama tournament sudah ada
        List<badminton_tournamentModel> existing =
                badmintonTournamentRepository.findByName(
                        tournament.getName()
                );

        if (!existing.isEmpty()) {
            throw new RuntimeException(
                "Tournament name '" + tournament.getName() + "' already exists"
            );
        }

        // biarkan tournamentId null → MongoDB generate otomatis
        return badmintonTournamentRepository.save(tournament);
    }

    // Update tournament
    public badminton_tournamentModel updateTournament(String id,
            badminton_tournamentModel tournament) {

        List<badminton_tournamentModel> existing =
                badmintonTournamentRepository.findByName(
                        tournament.getName()
                );

        if (!existing.isEmpty()) {
            badminton_tournamentModel sameName = existing.get(0);

            // ❗ kalau nama dipakai tournament lain → tolak
            if (!sameName.getId().equals(id)) {
                throw new RuntimeException(
                    "Tournament name '" + tournament.getName()
                    + "' already used by another tournament"
                );
            }
        }

        tournament.setId(id);
        return badmintonTournamentRepository.save(tournament);
    }

    // Delete tournament
    public void deleteTournament(String id) {
        badmintonTournamentRepository.deleteById(id);
    }

    // Past tournaments
    public List<badminton_tournamentModel> getPastTournaments() {
        return badmintonTournamentRepository.findByStatus("past");
    }

    // Upcoming tournaments
    public List<badminton_tournamentModel> getUpcomingTournaments() {
        return badmintonTournamentRepository.findByStatus("upcoming");
    }
}
