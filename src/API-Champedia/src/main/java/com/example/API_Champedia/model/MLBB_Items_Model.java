package com.example.API_Champedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mlbb_items")
public class MLBB_Items_Model {
    
    @Id
    private String id;
    private String itemName;
    private String itemImage;
    private String itemType;
    private String itemDescription;

    public MLBB_Items_Model() {
    }

    public MLBB_Items_Model(String id, String itemName, String itemImage, String itemType, String itemDescription) {
        this.id = id;
        this.itemName = itemName;
        this.itemImage = itemImage;
        this.itemType = itemType;
        this.itemDescription = itemDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }
}
