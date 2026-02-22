package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "MGP_HoF")
public class MGP_HoFModel {
    @Id
    private String hofID;

    private int yearsActive1;
    private int yearsActive2;

    private String riderID;
    private String riderName;
    private String riderNationality;

    public void sethofID(String hofID){
        this.hofID = hofID;
    }

    public String gethofID(){
        return hofID;
    }

    public void setYearsActive1(int yearsActive1){
        this.yearsActive1 = yearsActive1;
    }

    public int getYearsActive1(){
        return yearsActive1;
    }

    public void setYearsActive2(int yearsActive2){
        this.yearsActive2 = yearsActive2;
    }

    public int getYearsActive2(){
        return yearsActive2;
    }

    public void setRiderID(String riderID){
        this.riderID = riderID;
    }

    public String getRiderID(){
        return riderID;
    }

    public void setRiderName(String riderName){
        this.riderName = riderName;
    }

    public String getRiderName(){
        return riderName;
    }

    public void setRiderNationality(String riderNationality){
        this.riderNationality = riderNationality;
    }

    public String getRiderNationality(){
        return riderNationality;
    }
}
