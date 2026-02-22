package com.example.API_Champedia.dto;

public class MGP_teamDTO {

    private String tId;
    private String tName;
    private String tRegion;
    private String tLogo;
    private String tCategory;

    //Rider
    private String riderName1;
    private String riderName2;

    public String gettId() {
        return tId;
    }
    public void settId(String tId) {
        this.tId = tId;
    }

    public String gettName() {
        return tName;
    }
    public void settName(String tName) {
        this.tName = tName;
    }

    public String gettRegion() {
        return tRegion;
    }
    public void settRegion(String tRegion) {
        this.tRegion = tRegion;
    }

    public String gettLogo() {
        return tLogo;
    }
    public void settLogo(String tLogo) {
        this.tLogo = tLogo;
    }

    public String gettCategory() {
        return tCategory;
    }
    public void settCategory(String tCategory) {
        this.tCategory = tCategory;
    }

    public String getriderName1() {
        return riderName1;
    }
    public void setriderName1(String riderName1) {
        this.riderName1 = riderName1;
    }

    public String getriderName2() {
        return riderName2;
    }
    public void setriderName2(String riderName2) {
        this.riderName2 = riderName2;
    }
}
