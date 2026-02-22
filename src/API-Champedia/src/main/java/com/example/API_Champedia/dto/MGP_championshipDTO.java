package com.example.API_Champedia.dto;

public class MGP_championshipDTO {

    private String riderId;
    private String teamId;
    private int points;

    public String getRiderId() { 
        return riderId; 
    }
    public void setRiderId(String riderId) { 
        this.riderId = riderId; 
    }

    public String getTeamId() { 
        return teamId; 
    }
    public void setTeamId(String teamId) { 
        this.teamId = teamId; 
    }

    public int getPoints() { 
        return points; 
    }
    public void setPoints(int points) { 
        this.points = points; 
    }

}
