package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pubg_tours")
public class PUBG_Tours_Model {
    
    @Id
    private String id;
    private String tourLogo;
    private String tourName;
    private String tourTier;
    private String tourRegion;
    private String tourLocation;
    private String tourDates;
    private String tourPrizePool;

    public PUBG_Tours_Model() {
    }

    public PUBG_Tours_Model(String id, String tourLogo, String tourName, String tourTier, String tourRegion, String tourLocation, String tourDates, String tourPrizePool) {
        this.id = id;
        this.tourLogo = tourLogo;
        this.tourName = tourName;
        this.tourTier = tourTier;
        this.tourRegion = tourRegion;
        this.tourLocation = tourLocation;
        this.tourDates = tourDates;
        this.tourPrizePool = tourPrizePool;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTourLogo() {
        return tourLogo;
    }

    public void setTourLogo(String tourLogo) {
        this.tourLogo = tourLogo;
    }

    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

    public String getTourTier() {
        return tourTier;
    }

    public void setTourTier(String tourTier) {
        this.tourTier = tourTier;
    }

    public String getTourRegion() {
        return tourRegion;
    }

    public void setTourRegion(String tourRegion) {
        this.tourRegion = tourRegion;
    }

    public String getTourLocation() {
        return tourLocation;
    }

    public void setTourLocation(String tourLocation) {
        this.tourLocation = tourLocation;
    }
    public String getTourDates() {
        return tourDates;
    }

    public void setTourDates(String tourDates) {
        this.tourDates = tourDates;
    }

    public String getTourPrizePool() {
        return tourPrizePool;
    }

    public void setTourPrizePool(String tourPrizePool) {
        this.tourPrizePool = tourPrizePool;
    }
}
