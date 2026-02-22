package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "MGP_nextRace")
public class MGP_nextRaceModel {
    
    @Id
    private String raceID;
    
    private String raceDate;
    private String raceTitle;
    private String circuitID;
    private String raceCircuit;
    private String racePhoto;

    public void setRaceID(String raceID) {
        this.raceID = raceID;
    }

    public String getRaceID() {
        return raceID;
    }

    public void setRaceDate(String raceDate) {
        this.raceDate = raceDate;
    }

    public String getRaceDate() {
        return raceDate;
    }

    public void setRaceTitle(String raceTitle) {
        this.raceTitle = raceTitle;
    }

    public String getRaceTitle() {
        return raceTitle;
    }

    public void setCircuitID(String circuitID) {
        this.circuitID = circuitID;
    }

    public String getCircuitID() {
        return circuitID;
    }

    public void setRaceCircuit(String raceCircuit) {
        this.raceCircuit = raceCircuit;
    }

    public String getRaceCircuit() {
        return raceCircuit;
    }

    public void setRacePhoto(String racePhoto) {
        this.racePhoto = racePhoto;
    }

    public String getRacePhoto() {
        return racePhoto;
    }
}
