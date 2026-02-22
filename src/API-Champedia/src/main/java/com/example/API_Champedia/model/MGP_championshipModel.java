package com.example.API_Champedia.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.API_Champedia.standings.MGP_championshipStandings;

@Document(collection = "championships")
public class MGP_championshipModel {

    @Id
    private String cId;

    private int cYear;
    private String cCategory;

    //List of the riders
    private List<MGP_championshipStandings> standings;

    public String getcId() { 
        return cId; 
    }
    public void setcId(String cId) { 
        this.cId = cId; 
    }

    public int getcYear() { 
        return cYear; 
    }
    public void setcYear(int cYear) { 
        this.cYear = cYear; 
    }

    public String getcCategory() { 
        return cCategory; 
    }
    public void setcCategory(String cCategory) { 
        this.cCategory = cCategory; 
    }

    public List<MGP_championshipStandings> getStandings() { 
        return standings; 
    }
    public void setStandings(List<MGP_championshipStandings> standings) { 
        this.standings = standings; 
    }
}