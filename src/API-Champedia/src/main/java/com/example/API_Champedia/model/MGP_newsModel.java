package com.example.API_Champedia.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "news")
public class MGP_newsModel {

    @Id
    private String newsID;

    private String newsTitle;
    private String newsContent;
    private Date newsDate;
    private String newsImage;

    public void setnewsID(String newsID) {
        this.newsID = newsID;
    }

    public String getnewsID() {
        return newsID;
    }

    public void setnewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getnewsTitle() {
        return newsTitle;
    }

    public void setnewsDate(Date newsDate) {
        this.newsDate = newsDate;
    }

    public Date getnewsDate() {
        return newsDate;
    }

    public void setnewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getnewsContent() {
        return newsContent;
    }

    public void setnewsImage(String newsImage) {
        this.newsImage = newsImage;
    }

    public String getnewsImage() {
        return newsImage;
    }
    
}
