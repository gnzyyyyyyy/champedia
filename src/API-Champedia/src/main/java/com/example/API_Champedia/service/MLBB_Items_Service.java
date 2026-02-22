package com.example.API_Champedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.API_Champedia.model.MLBB_Items_Model;
import com.example.API_Champedia.repository.MLBB_Items_Repository;

@Service
public class MLBB_Items_Service {
    
    @Autowired
    private MLBB_Items_Repository itemRepository;

    // Get All

    public List<MLBB_Items_Model> getAllItems() {
        return itemRepository.findAll();
    }

    // Get by ID
    public Optional<MLBB_Items_Model> getItemById(String id) {
        return itemRepository.findById(id);
    }

    // Create
    public MLBB_Items_Model addItem(MLBB_Items_Model item) {
        Optional<MLBB_Items_Model> existingItem = itemRepository.findByItemNameIgnoreCase(item.getItemName());
        if (existingItem.isPresent()) {
            throw new DuplicateItemNameException("Item with name " + item.getItemName() + " already exists.");
        }
        return itemRepository.save(item);
    }

    public class DuplicateItemNameException extends RuntimeException {
        public DuplicateItemNameException(String message) {
            super(message);
        }
    }

    // Update
    public MLBB_Items_Model updateItem(String id, MLBB_Items_Model itemData) {
        Optional<MLBB_Items_Model> item = itemRepository.findById(id);
        if (item.isPresent()) {
            MLBB_Items_Model itemToUpdate = item.get();
            itemToUpdate.setItemName(itemData.getItemName());
            itemToUpdate.setItemImage(itemData.getItemImage());
            itemToUpdate.setItemType(itemData.getItemType());
            itemToUpdate.setItemDescription(itemData.getItemDescription());
            return itemRepository.save(itemToUpdate);
        } else {
            return null;
        }
    }

    // Delete
    public void deleteItem(String id) {
        itemRepository.deleteById(id);
    }

    // < -- Addition --> //
    // Get item by type
    public List<MLBB_Items_Model> getItemsByType(String type) {
        return itemRepository.findByItemType(type);
    }
}
