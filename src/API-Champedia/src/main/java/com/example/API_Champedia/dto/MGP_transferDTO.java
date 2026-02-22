package com.example.API_Champedia.dto;

public class MGP_transferDTO {
    
    private String transferID;

    //Output
    private String riderName;
    private String teamName1;
    private String teamName2;

    public void settransferID(String transferID) {
        this.transferID = transferID;
    }

    public String gettransferID() {
        return transferID;
    }

    public void setriderName(String riderName) {
        this.riderName = riderName;
    }

    public String getriderName() {
        return riderName;
    }

    public void setteamName1(String teamName1) {
        this.teamName1 = teamName1;
    }

    public String getteamName1() {
        return teamName1;
    }

    public String getteamName2() {
        return teamName2;
    }

    public void setteamName2(String teamName2) {
        this.teamName2 = teamName2;
    }
}
