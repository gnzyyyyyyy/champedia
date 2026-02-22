package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cr_players")
public class CR_Players_Model {
    
    @Id
    private String id;
    private String playerIGN;
    private String playerName;
    private String playerRole;
    private String playerRegion;
    private String playerCountry;
    private String country_flag;
    private String teamID;

    public CR_Players_Model() {
    }

    public CR_Players_Model(String id, String playerIGN, String playerName, String playerRole, String playerRegion, String playerCountry, String teamID) {
        this.id = id;
        this.playerIGN = playerIGN;
        this.playerName = playerName;
        this.playerRole = playerRole;
        this.playerRegion = playerRegion;
        this.playerCountry = playerCountry;
        this.teamID = teamID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlayerIGN() {
        return playerIGN;
    }

    public void setPlayerIGN(String playerIGN) {
        this.playerIGN = playerIGN;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayerRole() {
        return playerRole;
    }

    public void setPlayerRole(String playerRole) {
        this.playerRole = playerRole;
    }

    public String getPlayerRegion() {
        return playerRegion;
    }

    public void setPlayerRegion(String playerRegion) {
        this.playerRegion = playerRegion;
    }

    public String getPlayerCountry() {
        return playerCountry;
    }

    public void setPlayerCountry(String playerCountry) {
        this.playerCountry = playerCountry;
    }

    public String getCountry_flag() {
        return country_flag;
    }

    public void setCountry_flag(String country_flag) {
        this.country_flag = country_flag;
    }

    public String getTeamID() {
        return teamID;
    }

    public void setTeamID(String teamID) {
        this.teamID = teamID;
    }
}
