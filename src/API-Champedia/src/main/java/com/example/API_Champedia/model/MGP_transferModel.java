package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transfers")
public class MGP_transferModel {
    
    @Id
    private String transferID;

    private String riderID;
    private String teamID1;
    private String teamID2;

    public void settransferID(String transferID){
        this.transferID = transferID;
    }

    public String gettransferID(){
        return transferID;
    }

    public void setriderID(String riderID){
        this.riderID = riderID;
    }

    public String getriderID(){
        return riderID;
    }

    public void setteamID1(String teamID1){
        this.teamID1 = teamID1;
    }

    public String getteamID1(){
        return teamID1;
    }

    public void setteamID2(String teamID2){
        this.teamID2 = teamID2;
    }

    public String getteamID2(){
        return teamID2;
    }
}
