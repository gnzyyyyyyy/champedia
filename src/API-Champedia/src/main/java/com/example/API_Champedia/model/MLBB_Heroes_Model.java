package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mlbb_heroes")
public class MLBB_Heroes_Model {

    @Id
    private String id;
    private String heroName;
    private String heroImages;
    private String heroRole;
    private String heroDescription;

    public MLBB_Heroes_Model() {
    }

    public MLBB_Heroes_Model(String id, String heroName, String heroImages, String heroRole, String heroDescription) {
        this.id = id;
        this.heroName = heroName;
        this.heroImages = heroImages;
        this.heroRole = heroRole;
        this.heroDescription = heroDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeroName() {
        return heroName;
    }

    public void setHeroName(String heroName) {
        this.heroName = heroName;
    }

    public String getHeroImages() {
        return heroImages;
    }

    public void setHeroImages(String heroImages) {
        this.heroImages = heroImages;
    }

    public String getHeroRole() {
        return heroRole;
    }

    public void setHeroRole(String heroRole) {
        this.heroRole = heroRole;
    }

    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }
}

