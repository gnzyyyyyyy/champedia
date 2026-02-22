package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "valo_agents")
public class VALO_Agents_Model {

    @Id
    private String id;
    private String agentName;
    private String agentImages;
    private String agentRole;
    private String agentDescription;

    public VALO_Agents_Model() {
    }

    public VALO_Agents_Model(String id, String agentName, String agentImages, String agentRole, String agentDescription) {
        this.id = id;
        this.agentName = agentName;
        this.agentImages = agentImages;
        this.agentRole = agentRole;
        this.agentDescription = agentDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getAgentImages() {
        return agentImages;
    }

    public void setAgentImages(String agentImages) {
        this.agentImages = agentImages;
    }

    public String getAgentRole() {
        return agentRole;
    }

    public void setAgentRole(String agentRole) {
        this.agentRole = agentRole;
    }

    public String getAgentDescription() {
        return agentDescription;
    }

    public void setAgentDescription(String agentDescription) {
        this.agentDescription = agentDescription;
    }
}

