package com.example.API_Champedia.standings;

public class MGP_championshipStandings {

    private String riderId;
    private String riderName; //Output

    private String teamId;
    private String teamName; //Output

    private int points;
    private int gap;

    public String getRiderId() {
         return riderId;
    }

    public void setRiderId(String riderId) { 
        this.riderId = riderId; 
    }

    public String getRiderName() { 
        return riderName; 
    }
    public void setRiderName(String riderName) { 
        this.riderName = riderName; 
    }

    public String getTeamId() { 
        return teamId; 
    }
    public void setTeamId(String teamId) { 
        this.teamId = teamId; 
    }

    public String getTeamName() { 
        return teamName; 
    }
    public void setTeamName(String teamName) { 
        this.teamName = teamName; 
    }

    public int getPoints() { 
        return points; 
    }
    public void setPoints(int points) { 
        this.points = points; 
    }

    public int getGap() { 
        return gap; 
    }
    public void setGap(int gap) { 
        this.gap = gap; 
    }
}
