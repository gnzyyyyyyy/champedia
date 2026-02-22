package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.chessTournamentModel;
import com.example.API_Champedia.service.chessTournamentService;

@RestController
@RequestMapping("/chess/tournaments")
@CrossOrigin(origins = "http://localhost:3000")
public class chessTournamentController {

    private chessTournamentService service;

    public chessTournamentController(chessTournamentService service) {
        this.service = service;
    }

    @GetMapping
    public List<chessTournamentModel> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public chessTournamentModel getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping
    public chessTournamentModel create(@RequestBody chessTournamentModel t) {
        return service.create(t);
    }

    @PutMapping("/{id}")
    public chessTournamentModel update(@PathVariable String id, @RequestBody chessTournamentModel t) {
        return service.update(id, t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @GetMapping("/past")
    public List<chessTournamentModel> past() {
        return service.getPast();
    }

    @GetMapping("/upcoming")
    public List<chessTournamentModel> upcoming() {
        return service.getUpcoming();
    }
}
