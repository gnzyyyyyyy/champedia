package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pubg_maps")
public class PUBG_Maps_Model {
    
    @Id
    private String id;
    private String mapName;
    private String mapImages;
    private String mapLayout;

    public PUBG_Maps_Model() {
    }
    public PUBG_Maps_Model(String id, String mapName, String mapImages, String mapLayout) {
        this.id = id;
        this.mapName = mapName;
        this.mapImages = mapImages;
        this.mapLayout = mapLayout;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getMapName() {
        return mapName;
    }
    public void setMapName(String mapName) {
        this.mapName = mapName;
    }
    public String getMapImages() {
        return mapImages;
    }
    public void setMapImages(String mapImages) {
        this.mapImages = mapImages;
    }
    public String getMapLayout() {
        return mapLayout;
    }
    public void setMapLayout(String mapLayout) {
        this.mapLayout = mapLayout;
    }
}
