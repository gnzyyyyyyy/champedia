package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cr_evo")
public class CR_Evo_Model {

    @Id
    private String id;
    private String cardName;
    private String cardImages;
    private int cardCost;
    private String cardType;
    private String cardRarity;
    private String heroDescription;

    public CR_Evo_Model() {
    }

    public CR_Evo_Model(
            String id,
            String cardName,
            String cardImages,
            int cardCost,
            String cardType,
            String cardRarity,
            String heroDescription
    ) {
        this.id = id;
        this.cardName = cardName;
        this.cardImages = cardImages;
        this.cardCost = cardCost;
        this.cardType = cardType;
        this.cardRarity = cardRarity;
        this.heroDescription = heroDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardImages() {
        return cardImages;
    }

    public void setCardImages(String cardImages) {
        this.cardImages = cardImages;
    }

    public int getCardCost() {
        return cardCost;
    }

    public void setCardCost(int cardCost) {
        this.cardCost = cardCost;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardRarity() {
        return cardRarity;
    }

    public void setCardRarity(String cardRarity) {
        this.cardRarity = cardRarity;
    }

    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }
}

