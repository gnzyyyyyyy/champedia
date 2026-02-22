package com.example.API_Champedia.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.dto.MGP_transferDTO;
import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.model.MGP_teamModel;
import com.example.API_Champedia.model.MGP_transferModel;
import com.example.API_Champedia.repository.MGP_riderRepository;
import com.example.API_Champedia.repository.MGP_teamRepository;
import com.example.API_Champedia.repository.MGP_transferRepository;

@Service
public class MGP_transferService {

    private final MGP_transferRepository transferRepository;
    private final MGP_riderRepository riderRepository;
    private final MGP_teamRepository teamRepository;

    public MGP_transferService(
            MGP_transferRepository transferRepository,
            MGP_riderRepository riderRepository,
            MGP_teamRepository teamRepository) {

        this.transferRepository = transferRepository;
        this.riderRepository = riderRepository;
        this.teamRepository = teamRepository;
    }

    // CONVERT MODEL → DTO
    private MGP_transferDTO convertToDTO(MGP_transferModel transfer) {

        MGP_transferDTO dto = new MGP_transferDTO();
        dto.settransferID(transfer.gettransferID());

        String riderID = transfer.getriderID();
        String teamID1 = transfer.getteamID1();
        String teamID2 = transfer.getteamID2();

        // Rider Name
        if (riderID != null) {
            MGP_riderModel rider = riderRepository.findById(riderID).orElse(null);
            dto.setriderName(rider != null ? rider.getrName() : null);
        }

        // From Team (teamName1)
        if (teamID1 != null) {
            MGP_teamModel team1 = teamRepository.findById(teamID1).orElse(null);
            dto.setteamName1(team1 != null ? team1.gettName() : null);
        }

        // To Team (teamName2)
        if (teamID2 != null) {
            MGP_teamModel team2 = teamRepository.findById(teamID2).orElse(null);
            dto.setteamName2(team2 != null ? team2.gettName() : null);
        }

        return dto;
    }

    // GET ALL TRANSFERS
    public List<MGP_transferDTO> getAllTransfers() {
        return transferRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public MGP_transferDTO getTransferById(String id) {
        return transferRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    // SAVE TRANSFER
    public MGP_transferDTO saveTransfer(MGP_transferModel transfer) {

        // VALIDATION
        if (transfer.getteamID1() != null &&
            transfer.getteamID2() != null &&
            transfer.getteamID1().equals(transfer.getteamID2())) {

            throw new RuntimeException("A rider cannot transfer to the same team.");
        }

        // CEK RIDER VALID
        if (!riderRepository.existsById(transfer.getriderID())) {
            throw new RuntimeException("Rider ID not found: " + transfer.getriderID());
        }

        // CEK TEAM FROM VALID
        if (!teamRepository.existsById(transfer.getteamID1())) {
            throw new RuntimeException("Team From ID not found: " + transfer.getteamID1());
        }

        // CEK TEAM TO VALID
        if (!teamRepository.existsById(transfer.getteamID2())) {
            throw new RuntimeException("Team To ID not found: " + transfer.getteamID2());
        }

        MGP_transferModel saved = transferRepository.save(transfer);
        return convertToDTO(saved);
    }

    // UPDATE TRANSFER
    public MGP_transferDTO updateTransfer(String id, MGP_transferModel newTransfer) {

        MGP_transferModel existing = transferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer not found with ID: " + id));

        // VALIDATION:TEAM SAME
        if (newTransfer.getteamID1().equals(newTransfer.getteamID2())) {
            throw new RuntimeException("A rider cannot transfer to the same team.");
        }

        // UPDATE FIELD
        existing.setriderID(newTransfer.getriderID());
        existing.setteamID1(newTransfer.getteamID1());
        existing.setteamID2(newTransfer.getteamID2());

        MGP_transferModel saved = transferRepository.save(existing);
        return convertToDTO(saved);
    }

    // DELETE
    public void deleteTransfer(String id) {
        if (!transferRepository.existsById(id)) {
            throw new RuntimeException("Transfer ID not found: " + id);
        }
        transferRepository.deleteById(id);
    }
}
