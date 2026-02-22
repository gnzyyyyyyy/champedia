package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "badminton_players") // karena di DB-mu collection-nya bernama players
public class badminton_playersModel {

    @Id
    private String playerId;

    private String playerName;
    private String playerNationality;
    private int playerAge;
    private int playerRanking;

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayerNationality() {
        return playerNationality;
    }

    public void setPlayerNationality(String playerNationality) {
        this.playerNationality = playerNationality;
    }

    public int getPlayerAge() {
        return playerAge;
    }

    public void setPlayerAge(int playerAge) {
        this.playerAge = playerAge;
    }

    public int getPlayerRanking() {
        return playerRanking;
    }

    public void setPlayerRanking(int playerRanking) {
        this.playerRanking = playerRanking;
    }
}
