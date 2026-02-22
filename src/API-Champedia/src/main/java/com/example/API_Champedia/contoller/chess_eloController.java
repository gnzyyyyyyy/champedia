package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.chess_eloModel;
import com.example.API_Champedia.service.chess_eloService;

@RestController
@RequestMapping("/chess/elo")
@CrossOrigin(origins = "http://localhost:3000")
public class chess_eloController {

    private chess_eloService service;

    public chess_eloController(chess_eloService service) {
        this.service = service;
    }

    // GET ALL
    @GetMapping
    public List<chess_eloModel> getAll() {
        return service.getAllElo();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public chess_eloModel getById(@PathVariable String id) {
        return service.getEloById(id);
    }

    // POST
    @PostMapping
    public chess_eloModel create(@RequestBody chess_eloModel elo) {
        return service.saveElo(elo);
    }

    // PUT
    @PutMapping("/{id}")
    public chess_eloModel update(@PathVariable String id,
                                 @RequestBody chess_eloModel elo) {
        return service.updateElo(id, elo);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteElo(id);
    }

    // FILTER
    @GetMapping("/active")
    public List<chess_eloModel> getActive() {
        return service.getActivePlayers();
    }

    @GetMapping("/title/{title}")
    public List<chess_eloModel> getByTitle(@PathVariable String title) {
        return service.getByTitle(title);
    }
}
