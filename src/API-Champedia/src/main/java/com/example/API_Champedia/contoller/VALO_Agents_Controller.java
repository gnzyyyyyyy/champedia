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

import com.example.API_Champedia.model.VALO_Agents_Model;
import com.example.API_Champedia.service.VALO_Agents_Service;
import com.example.API_Champedia.service.VALO_Agents_Service.DuplicateAgentNameException;

@RestController
@RequestMapping("/valo_agents")
@CrossOrigin(origins = "*")
public class VALO_Agents_Controller {
    @Autowired
    private VALO_Agents_Service heroService;

    // GET ALL
    @GetMapping
    public List<VALO_Agents_Model> getAllAgents() {
        return heroService.getAllAgents();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public VALO_Agents_Model getAgentById( @PathVariable String id) {
        return heroService.getAgentById(id);
    }

    // CREATE   
    @PostMapping ResponseEntity<?> addAgent( @RequestBody VALO_Agents_Model hero) {
        try {
            VALO_Agents_Model newHero = heroService.addAgent(hero);
            return ResponseEntity.ok(newHero);
        } catch (DuplicateAgentNameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public VALO_Agents_Model updateAgent(@PathVariable String id, @RequestBody VALO_Agents_Model heroData) {
        return heroService.updateAgent(id, heroData);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public boolean deleteAgent(@PathVariable String id) {
        return heroService.deleteAgent(id);
    }

    // *** ADDITION *** //
    // Get by Role
    @GetMapping("/role/{role}")
    public List<VALO_Agents_Model> getAgentsByRole(@PathVariable String role) {
        return heroService.getAgentsByRole(role);
    }
}

