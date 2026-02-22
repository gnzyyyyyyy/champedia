package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "highlights")
public class MGP_highlightModel {
    
    @Id
    private String highlightID;

    private String highlightTitle;
    private String highlightLinkVideo;
    private String highlightImage;

    public void sethighlightID(String highlightID) {
        this.highlightID = highlightID;
    }

    public String gethighlightID() {
        return highlightID;
    }

    public void sethighlightTitle(String highlightTitle) {
        this.highlightTitle = highlightTitle;
    }

    public String gethighlightTitle() {
        return highlightTitle;
    }

    public void sethighlightLinkVideo(String highlightLinkVideo) {
        this.highlightLinkVideo = highlightLinkVideo;
    }

    public String gethighlightLinkVideo() {
        return highlightLinkVideo;
    }

    public void sethighlightImage(String highlightImage) {
        this.highlightImage = highlightImage;
    }

    public String gethighlightImage() {
        return highlightImage;
    }
}
