package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "riders")
public class MGP_riderModel {

    @Id
    private String rId;

    private String rName;
    private int rAge;
    private String rNationality;
    private String rCategory;
    private String rTeam;
    private String rPhoto;
    private int rTitleCount;
    private int rWins;
    private int rPodiums;
    private int rTotalRaces;

    public String getrId() {
        return rId;
    }

    public void setrId(String rId) {
        this.rId = rId;
    }

    public String getrName() {
        return rName;
    }

    public void setrName(String rName) {
        this.rName = rName;
    }

    public int getrAge() {
        return rAge;
    }

    public void setrAge(int rAge) {
        this.rAge = rAge;
    }

    public String getrNationality() {
        return rNationality;
    }

    public void setrNationality(String rNationality) {
        this.rNationality = rNationality;
    }

    public String getrCategory() {
        return rCategory;
    }

    public void setrCategory(String rCategory) {
        this.rCategory = rCategory;
    }

    public String getrTeam() {
        return rTeam;
    }

    public void setrTeam(String rTeam) {
        this.rTeam = rTeam;
    }

    public String getrPhoto() {
        return rPhoto;
    }

    public void setrPhoto(String rPhoto) {
        this.rPhoto = rPhoto;
    }

    public int getrTitleCount() {
        return rTitleCount;
    }

    public void setrTitleCount(int rTitleCount) {
        this.rTitleCount = rTitleCount;
    }

    public int getrWins() {
        return rWins;
    }

    public void setrWins(int rWins) {
        this.rWins = rWins;
    }

    public int getrPodiums() {
        return rPodiums;
    }

    public void setrPodiums(int rPodiums) {
        this.rPodiums = rPodiums;
    }

    public int getrTotalRaces() {
        return rTotalRaces;
    }

    public void setrTotalRaces(int rTotalRaces) {
        this.rTotalRaces = rTotalRaces;
    }
}