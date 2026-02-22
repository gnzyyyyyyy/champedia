package com.example.API_Champedia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.dto.MGP_championshipDTO;
import com.example.API_Champedia.model.MGP_championshipModel;
import com.example.API_Champedia.model.MGP_riderModel;
import com.example.API_Champedia.model.MGP_teamModel;
import com.example.API_Champedia.repository.MGP_championshipRepository;
import com.example.API_Champedia.repository.MGP_riderRepository;
import com.example.API_Champedia.repository.MGP_teamRepository;
import com.example.API_Champedia.standings.MGP_championshipStandings;

@Service
public class MGP_championshipService {

    @Autowired
    private MGP_championshipRepository championshipRepository;

    @Autowired
    private MGP_riderRepository riderRepository;

    @Autowired
    private MGP_teamRepository teamRepository;

    //Create Championship
    public MGP_championshipModel createChampionship(MGP_championshipModel model) {

        if (model.getStandings() != null) {

            //Check the rider already in the standings
            for (int i = 0; i < model.getStandings().size(); i++) {
                for (int j = i + 1; j < model.getStandings().size(); j++) {
                    if (model.getStandings().get(i).getRiderId()
                            .equals(model.getStandings().get(j).getRiderId())) {

                            throw new RuntimeException("Duplicate rider in standings: " + model.getStandings().get(i).getRiderId());
                    }
                }
            }

            //Validate the rider and team
            for (MGP_championshipStandings s : model.getStandings()) {

                //Check the existing of rider
                MGP_riderModel rider = riderRepository.findById(s.getRiderId()).orElse(null);
                if (rider == null) {
                    throw new RuntimeException("Rider not found: " + s.getRiderId());
                }

                //Check the existing of team
                MGP_teamModel team = teamRepository.findById(s.getTeamId()).orElse(null);
                if (team == null) {
                    throw new RuntimeException("Team not found: " + s.getTeamId());
                }

                //Set output name
                s.setRiderName(rider.getrName());
                s.setTeamName(team.gettName());
            }

            //Sort standings by points DESC
            model.getStandings().sort((a, b) -> Integer.compare(b.getPoints(), a.getPoints()));

            //Calculate gap
            int topPoints = model.getStandings().get(0).getPoints();
            for (MGP_championshipStandings s : model.getStandings()) {
                s.setGap(topPoints - s.getPoints());
            }
        }

        //Save
        return championshipRepository.save(model);
    }

    //Add one rider into the existing championship
    public MGP_championshipModel addRider(String championshipId, MGP_championshipDTO dto) {

        //Check the existing of championship
        MGP_championshipModel champ = championshipRepository.findById(championshipId).orElse(null);
        if (champ == null) {
            throw new RuntimeException("Championship not found");
        }

        //Cek the rider already exist or not
        for (MGP_championshipStandings s : champ.getStandings()) {
            if (s.getRiderId().equals(dto.getRiderId())) {
                throw new RuntimeException(
                        "Rider with ID '" + dto.getRiderId() + "' already exists in this championship");
            }
        }

        //Validate rider
        MGP_riderModel rider = riderRepository.findById(dto.getRiderId()).orElse(null);
        if (rider == null) {
            throw new RuntimeException("Rider not found");
        }

        //Validate team
        MGP_teamModel team = teamRepository.findById(dto.getTeamId()).orElse(null);
        if (team == null) {
            throw new RuntimeException("Team not found");
        }

        //Create standing
        MGP_championshipStandings standing = new MGP_championshipStandings();
        standing.setRiderId(dto.getRiderId());
        standing.setRiderName(rider.getrName());
        standing.setTeamId(dto.getTeamId());
        standing.setTeamName(team.gettName());
        standing.setPoints(dto.getPoints());

        champ.getStandings().add(standing);

        //Sort standings
        champ.getStandings().sort((a, b) -> Integer.compare(b.getPoints(), a.getPoints()));

        //Update gaps
        int topPoints = champ.getStandings().get(0).getPoints();
        for (MGP_championshipStandings s : champ.getStandings()) {
            s.setGap(topPoints - s.getPoints());
        }

        return championshipRepository.save(champ);
    }

    //Get all championships
    public List<MGP_championshipModel> getAllChampionships() {
        return championshipRepository.findAll();
    }

    //Get championship by ID
    public MGP_championshipModel getChampionship(String id) {
        return championshipRepository.findById(id).orElse(null);
    }

    //Update championship
    public MGP_championshipModel updateChampionship(String id, MGP_championshipModel newData) {

        //Chech the existing of championship
        MGP_championshipModel existing = championshipRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new RuntimeException("Championship not found");
        }

        existing.setcYear(newData.getcYear());
        existing.setcCategory(newData.getcCategory());
        existing.setStandings(newData.getStandings());

        if (existing.getStandings() != null && !existing.getStandings().isEmpty()) {
            existing.getStandings().sort((a, b) -> Integer.compare(b.getPoints(), a.getPoints()));

            int topPoints = existing.getStandings().get(0).getPoints();
            for (MGP_championshipStandings s : existing.getStandings()) {
                s.setGap(topPoints - s.getPoints());
            }
        }

        return championshipRepository.save(existing);
    }

    //Delete
    public void deleteChampionship(String id) {
        championshipRepository.deleteById(id);
    }
}