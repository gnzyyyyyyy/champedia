package com.example.API_Champedia.dto;

public class MGP_circuitDTO {

    private String circuitID;

    //Output
    private String circuitMostWinName;
    private String circuitMostPoleName;

    private String circuitName;
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

    public void setCircuitMostWinName(String circuitMostWinName) {
        this.circuitMostWinName = circuitMostWinName;
    }

    public String getCircuitMostWinName() {
        return circuitMostWinName;
    }

    public void setCircuitMostPoleName(String circuitMostPoleName) {
        this.circuitMostPoleName = circuitMostPoleName;
    }

    public String getCircuitMostPoleName() {
        return circuitMostPoleName;
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
