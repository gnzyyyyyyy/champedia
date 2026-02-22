package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teams")
public class MGP_teamModel {

    @Id
    private String tId;

    private String tName;
    private String tRegion;
    private String tLogo;
    private String tCategory;

    // Only store IDs
    private String rId1;
    private String rId2;

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

    public String getrId1() {
        return rId1;
    }
    public void setrId1(String rId1) {
        this.rId1 = rId1;
    }

    public String getrId2() {
        return rId2;
    }
    public void setrId2(String rId2) {
        this.rId2 = rId2;
    }
}