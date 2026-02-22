package com.example.API_Champedia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.dto.MGP_circuitDTO;
import com.example.API_Champedia.model.MGP_circuitModel;
import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.repository.MGP_circuitRepository;
import com.example.API_Champedia.repository.MGP_riderRepository;

@Service
public class MGP_circuitService {

    @Autowired
    private MGP_circuitRepository circuitRepository;

    @Autowired
    private MGP_riderRepository riderRepository;

    // ========================================================
    // GET ALL CIRCUITS (DTO)
    // ========================================================
    public List<MGP_circuitDTO> getAllCircuitsDTO() {
        return circuitRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // ========================================================
    // GET CIRCUIT BY ID (DTO)
    // ========================================================
    public MGP_circuitDTO getCircuitDTO(String id) {
        MGP_circuitModel circuit = circuitRepository.findById(id).orElse(null);
        return (circuit != null) ? convertToDTO(circuit) : null;
    }

    // ========================================================
    // CREATE CIRCUIT (RETURN DTO)
    // ========================================================
    public MGP_circuitDTO createCircuit(MGP_circuitModel circuit) {

        MGP_circuitModel saved = circuitRepository.save(circuit);

        return convertToDTO(saved);
    }

    // ========================================================
    // UPDATE CIRCUIT (RETURN DTO)
    // ========================================================
    public MGP_circuitDTO updateCircuit(String id, MGP_circuitModel updated) {

        MGP_circuitModel existing = circuitRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setCircuitName(updated.getCircuitName());
        existing.setCircuitMostWinID(updated.getCircuitMostWinID());
        existing.setCircuitMostPoleID(updated.getCircuitMostPoleID());
        existing.setCircuitBestPole(updated.getCircuitBestPole());
        existing.setCircuitBestRaceLap(updated.getCircuitBestRaceLap());
        existing.setCircuitTopSpeed(updated.getCircuitTopSpeed());
        existing.setCircuitCorner(updated.getCircuitCorner());

        circuitRepository.save(existing);

        return convertToDTO(existing);
    }

    // ========================================================
    // DELETE CIRCUIT
    // ========================================================
    public boolean deleteCircuit(String id) {
        if (!circuitRepository.existsById(id)) return false;

        circuitRepository.deleteById(id);
        return true;
    }

    // ========================================================
    // CONVERT MODEL TO DTO
    // ========================================================
    private MGP_circuitDTO convertToDTO(MGP_circuitModel circuit) {

        MGP_circuitDTO dto = new MGP_circuitDTO();

        dto.setCircuitID(circuit.getCircuitID());
        dto.setCircuitName(circuit.getCircuitName());
        dto.setCircuitBestPole(circuit.getCircuitBestPole());
        dto.setCircuitBestRaceLap(circuit.getCircuitBestRaceLap());
        dto.setCircuitTopSpeed(circuit.getCircuitTopSpeed());
        dto.setCircuitCorner(circuit.getCircuitCorner());

        // Resolve Most Win ID -> Name
        MGP_riderModel winRider = riderRepository.findByrId(circuit.getCircuitMostWinID());
        dto.setCircuitMostWinName(
                winRider != null ? winRider.getrName() : "Unknown Rider"
        );

        // Resolve Most Pole ID -> Name
        MGP_riderModel poleRider = riderRepository.findByrId(circuit.getCircuitMostPoleID());
        dto.setCircuitMostPoleName(
                poleRider != null ? poleRider.getrName() : "Unknown Rider"
        );

        return dto;
    }
}
