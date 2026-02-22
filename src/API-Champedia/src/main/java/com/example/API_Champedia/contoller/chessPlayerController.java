package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.chessPlayerModel;
import com.example.API_Champedia.service.chessPlayerService;

@RestController
@RequestMapping("/chess/players")
@CrossOrigin(origins = "http://localhost:3000")
public class chessPlayerController {

    private chessPlayerService service;

    public chessPlayerController(chessPlayerService service) {
        this.service = service;
    }

    @GetMapping
    public List<chessPlayerModel> getAll() {
        return service.getAllPlayers();
    }

    @GetMapping("/{id}")
    public chessPlayerModel getById(@PathVariable String id) {
        return service.getPlayerById(id);
    }

    @PostMapping
    public chessPlayerModel create(@RequestBody chessPlayerModel player) {
        return service.savePlayer(player);
    }

    @PutMapping("/{id}")
    public chessPlayerModel update(
            @PathVariable String id,
            @RequestBody chessPlayerModel player) {
        return service.updatePlayer(id, player);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deletePlayer(id);
    }
}
