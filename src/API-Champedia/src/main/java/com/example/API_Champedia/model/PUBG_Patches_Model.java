package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pubg_patches")
public class PUBG_Patches_Model {
    
    @Id
    private String id;
    private String patchVersion;
    private String patchDate;
    private String patchHighlights;

    public PUBG_Patches_Model() {
    }
    public PUBG_Patches_Model(String id, String patchVersion, String patchDate, String patchHighlights) {
        this.id = id;
        this.patchVersion = patchVersion;
        this.patchDate = patchDate;
        this.patchHighlights = patchHighlights;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getPatchVersion() {
        return patchVersion;
    }
    public void setPatchVersion(String patchVersion) {
        this.patchVersion = patchVersion;
    }
    public String getPatchDate() {
        return patchDate;
    }
    public void setPatchDate(String patchDate) {
        this.patchDate = patchDate;
    }
    public String getPatchHighlights() {
        return patchHighlights;
    }
    public void setPatchHighlights(String patchHighlights) {
        this.patchHighlights = patchHighlights;
    }
}
