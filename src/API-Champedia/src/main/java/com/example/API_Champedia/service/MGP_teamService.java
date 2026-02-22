package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.dto.MGP_teamDTO;
import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.model.MGP_teamModel;
import com.example.API_Champedia.repository.MGP_riderRepository;
import com.example.API_Champedia.repository.MGP_teamRepository;

@Service
public class MGP_teamService {

    private final MGP_teamRepository teamRepository;
    private final MGP_riderRepository riderRepository;

    public MGP_teamService(MGP_teamRepository teamRepository, MGP_riderRepository riderRepository) {
        this.teamRepository = teamRepository;
        this.riderRepository = riderRepository;
    }

    // -----------------------------
    // Convert TeamModel → teamDTO
    // -----------------------------
    private MGP_teamDTO convertToDTO(MGP_teamModel team) {

        MGP_teamDTO dto = new MGP_teamDTO();
        dto.settId(team.gettId());
        dto.settName(team.gettName());
        dto.settRegion(team.gettRegion());
        dto.settLogo(team.gettLogo());
        dto.settCategory(team.gettCategory());

        // Ambil rider name
        String riderId1 = team.getrId1();
        String riderId2 = team.getrId2();

        if (riderId1 != null) {
            MGP_riderModel r1 = riderRepository.findById(riderId1).orElse(null);
            dto.setriderName1(r1 != null ? r1.getrName() : null);
        }

        if (riderId2 != null) {
            MGP_riderModel r2 = riderRepository.findById(riderId2).orElse(null);
            dto.setriderName2(r2 != null ? r2.getrName() : null);
        }

        return dto;
    }

    //Get all teams
    public List<MGP_teamDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //Get team by id
    public MGP_teamDTO getTeamById(String id) {
        Optional<MGP_teamModel> team = teamRepository.findById(id);
        return team.map(this::convertToDTO).orElse(null);
    }

    //Save
    public MGP_teamDTO saveTeam(MGP_teamModel team) {

        List<MGP_teamModel> existing = teamRepository.findBytName(team.gettName());
        if (!existing.isEmpty()) {
            throw new RuntimeException("Team name '" + team.gettName() + "' already exists");
        }

        MGP_teamModel saved = teamRepository.save(team);
        return convertToDTO(saved);
    }

    //Update
    public MGP_teamDTO updateTeam(String id, MGP_teamModel team) {

        List<MGP_teamModel> existing = teamRepository.findBytName(team.gettName());
        if (!existing.isEmpty()) {
            MGP_teamModel sameName = existing.get(0);
            if (!sameName.gettId().equals(id)) {
                throw new RuntimeException("Team name '" + team.gettName() + "' already used by another team");
            }
        }

        team.settId(id);
        MGP_teamModel saved = teamRepository.save(team);
        return convertToDTO(saved);
    }

    //Delete
    public void deleteTeam(String id) {
        teamRepository.deleteById(id);
    }
}