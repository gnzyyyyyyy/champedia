package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.dto.MGP_circuitDTO;
import com.example.API_Champedia.model.MGP_circuitModel;
import com.example.API_Champedia.service.MGP_circuitService;

@RestController
@RequestMapping("/circuit")
@CrossOrigin("http://localhost:3000")
public class MGP_circuitController {

    private final MGP_circuitService circuitService;

    public MGP_circuitController(MGP_circuitService circuitService) {
        this.circuitService = circuitService;
    }

    @GetMapping
    public List<MGP_circuitDTO> getAllCircuits() {
        return circuitService.getAllCircuitsDTO();
    }

    // ==========================================================
    // GET CIRCUIT BY ID (DTO)
    // ==========================================================
    @GetMapping("/{id}")
    public MGP_circuitDTO getCircuit(@PathVariable String id) {
        return circuitService.getCircuitDTO(id);
    }

    // ==========================================================
    // CREATE CIRCUIT (RETURN DTO)
    // ==========================================================
    @PostMapping
    public MGP_circuitDTO createCircuit(@RequestBody MGP_circuitModel circuit) {
        return circuitService.createCircuit(circuit);
    }

    // Update circuit
    @PutMapping("/{id}")
    public MGP_circuitDTO updateCircuit(@PathVariable String id,
                                    @RequestBody MGP_circuitModel circuit) {
        return circuitService.updateCircuit(id, circuit);
    }

    // Delete circuit
    @DeleteMapping("/{id}")
    public void deleteCircuit(@PathVariable String id) {
        circuitService.deleteCircuit(id);
    }
}
