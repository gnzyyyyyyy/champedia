package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="circuits")
public class MGP_circuitModel {

    @Id
    private String circuitID;

    private String circuitName;
    private String circuitMostWinID;
    private String circuitMostPoleID;
    private String circuitBestPole;
    private String circuitBestRaceLap;
    private int circuitTopSpeed;
    private int circuitCorner;
    
    public void setCircuitID(String circuitID) {
        this.circuitID = circuitID;
    }

    public String getCircuitID(){
        return circuitID;
    }

    public void setCircuitName(String circuitName) {
        this.circuitName = circuitName;
    }

    public String getCircuitName() {
        return circuitName;
    }

    public void setCircuitMostWinID(String circuitMostWinID) {
        this.circuitMostWinID = circuitMostWinID;
    }

    public String getCircuitMostWinID() {
        return circuitMostWinID;
    }

    public void setCircuitMostPoleID(String circuitMostPoleID) {
        this.circuitMostPoleID = circuitMostPoleID;
    }

    public String getCircuitMostPoleID() {
        return circuitMostPoleID;
    }

    public void setCircuitTopSpeed(int circuitTopSpeed) {
        this.circuitTopSpeed = circuitTopSpeed;
    }

    public int getCircuitTopSpeed() {
        return circuitTopSpeed;
    }

    public void setCircuitBestPole(String circuitBestPole) {
        this.circuitBestPole = circuitBestPole;
    }

    public String getCircuitBestPole() {
        return circuitBestPole;
    }

    public void setCircuitBestRaceLap(String circuitBestRaceLap) {
        this.circuitBestRaceLap = circuitBestRaceLap;
    }

    public String getCircuitBestRaceLap() {
        return circuitBestRaceLap;
    }

    public void setCircuitCorner(int circuitCorner) {
        this.circuitCorner = circuitCorner;
    }

    public int getCircuitCorner() {
        return circuitCorner;
    }
}
