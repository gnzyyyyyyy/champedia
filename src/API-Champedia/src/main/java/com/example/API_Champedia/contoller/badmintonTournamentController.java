package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.badminton_tournamentModel;
import com.example.API_Champedia.service.badmintonTournamentService;

@RestController
@RequestMapping("/badminton/tournaments")
@CrossOrigin(origins = "http://localhost:3000")
public class badmintonTournamentController {

    private badmintonTournamentService service;

    public badmintonTournamentController(badmintonTournamentService service) {
        this.service = service;
    }

    @GetMapping
    public List<badminton_tournamentModel> getAll() {
        return service.getAllTournaments();
    }

    @GetMapping("/{id}")
    public badminton_tournamentModel getById(@PathVariable String id) {
        return service.getTournamentById(id);
    }

    @PostMapping
    public badminton_tournamentModel create(@RequestBody badminton_tournamentModel t) {
        return service.createTournament(t);
    }

    @PutMapping("/{id}")
    public badminton_tournamentModel update(@PathVariable String id, @RequestBody badminton_tournamentModel t) {
        return service.updateTournament(id, t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteTournament(id);
    }

    @GetMapping("/past")
    public List<badminton_tournamentModel> getPast() {
        return service.getPastTournaments();
    }

    @GetMapping("/upcoming")
    public List<badminton_tournamentModel> getUpcoming() {
        return service.getUpcomingTournaments();
    }
}
