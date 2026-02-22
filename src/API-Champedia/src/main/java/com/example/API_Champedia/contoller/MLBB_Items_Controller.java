package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.MLBB_Items_Model;
import com.example.API_Champedia.service.MLBB_Items_Service;
import com.example.API_Champedia.service.MLBB_Items_Service.DuplicateItemNameException;

@RestController
@RequestMapping("/mlbb_items")
@CrossOrigin(origins = "*")
public class MLBB_Items_Controller {
    @Autowired
    private MLBB_Items_Service itemService;

    // Get All
    @GetMapping
    public List<MLBB_Items_Model> getAllItems() {
        return itemService.getAllItems();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MLBB_Items_Model getItemById( @PathVariable String id) {
        return itemService.getItemById(id).orElse(null);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> addItem( @RequestBody MLBB_Items_Model item) {
        try {
            MLBB_Items_Model newItem = itemService.addItem(item);
            return ResponseEntity.ok(newItem);
        } catch (DuplicateItemNameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // Update
    @PutMapping("/{id}")
    public MLBB_Items_Model updateItem(@PathVariable String id, @RequestBody MLBB_Items_Model itemData) {
        return itemService.updateItem(id, itemData);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
    }

    // < -- Addition --> //
    // Get item by type
    @GetMapping("/type/{type}")
    public List<MLBB_Items_Model> getItemsByType(@PathVariable String type) {
        return itemService.getItemsByType(type);
    }
}
