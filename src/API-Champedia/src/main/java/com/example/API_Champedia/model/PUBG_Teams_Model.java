package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pubg_teams")
public class PUBG_Teams_Model {
    
    @Id
    private String id;
    private String teamName;
    private String teamNickname;
    private String teamLogo;
    private String teamRegion;
    private String teamCountry;
    private String teamStatus;

    public PUBG_Teams_Model() {
    }

    public PUBG_Teams_Model(String id, String teamName, String teamNickname, String teamLogo, String teamRegion, String teamCountry, String teamStatus) {
        this.id = id;
        this.teamName = teamName;
        this.teamNickname = teamNickname;
        this.teamLogo = teamLogo;
        this.teamRegion = teamRegion;
        this.teamCountry = teamCountry;
        this.teamStatus = teamStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamNickname() {
        return teamNickname;
    }

    public void setTeamNickname(String teamNickname) {
        this.teamNickname = teamNickname;
    }

    public String getTeamLogo() {
        return teamLogo;
    }

    public void setTeamLogo(String teamLogo) {
        this.teamLogo = teamLogo;
    }

    public String getTeamRegion() {
        return teamRegion;
    }

    public void setTeamRegion(String teamRegion) {
        this.teamRegion = teamRegion;
    }

    public String getTeamCountry() {
        return teamCountry;
    }

    public void setTeamCountry(String teamCountry) {
        this.teamCountry = teamCountry;
    }

    public String getTeamStatus() {
        return teamStatus;
    }

    public void setTeamStatus(String teamStatus) {
        this.teamStatus = teamStatus;
    }
}
