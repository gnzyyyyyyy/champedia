package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.MLBB_Heroes_Model;
import com.example.API_Champedia.service.MLBB_Heroes_Service;
import com.example.API_Champedia.service.MLBB_Heroes_Service.DuplicateHeroNameException;

@RestController
@RequestMapping("/mlbb_heroes")
@CrossOrigin(origins = "*")
public class MLBB_Heroes_Controller {
    @Autowired
    private MLBB_Heroes_Service heroService;

    // GET ALL
    @GetMapping
    public List<MLBB_Heroes_Model> getAllHeroes() {
        return heroService.getAllHeroes();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public MLBB_Heroes_Model getHeroById( @PathVariable String id) {
        return heroService.getHeroById(id);
    }

    // CREATE   
    @PostMapping ResponseEntity<?> addHero( @RequestBody MLBB_Heroes_Model hero) {
        try {
            MLBB_Heroes_Model newHero = heroService.addHero(hero);
            return ResponseEntity.ok(newHero);
        } catch (DuplicateHeroNameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public MLBB_Heroes_Model updateHero(@PathVariable String id, @RequestBody MLBB_Heroes_Model heroData) {
        return heroService.updateHero(id, heroData);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public boolean deleteHero(@PathVariable String id) {
        return heroService.deleteHero(id);
    }

    // *** ADDITION *** //
    // Get by Role
    @GetMapping("/role/{role}")
    public List<MLBB_Heroes_Model> getHeroesByRole(@PathVariable String role) {
        return heroService.getHeroesByRole(role);
    }
}
