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

import com.example.API_Champedia.service.VALO_Maps_Service;
import com.example.API_Champedia.service.VALO_Maps_Service.DuplicateMapNameException;
import com.example.API_Champedia.model.VALO_Maps_Model;


@RestController
@RequestMapping("/valo_maps")
@CrossOrigin(origins = "*")
public class VALO_Maps_Controller {
    @Autowired
    VALO_Maps_Service mapService;
    
    // Get All
    @GetMapping
    public List<VALO_Maps_Model> getAllMaps() {
        return mapService.getAllMaps();
    }

    // Get by ID
    @GetMapping("/{id}")
    public VALO_Maps_Model getMapById( @PathVariable String id) {
        return mapService.getMapById(id);
    }

    // Create
    @PostMapping ResponseEntity<?> addMap(@RequestBody VALO_Maps_Model map) {
        try {
            VALO_Maps_Model newMap = mapService.addMap(map);
            return ResponseEntity.ok(newMap);
        } catch (DuplicateMapNameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    //Update
    @PutMapping("/{id}")
    public VALO_Maps_Model updateMap(@PathVariable String id, @RequestBody VALO_Maps_Model map) {
        return mapService.updateMap(id, map);
    }

    // Delete
    @DeleteMapping("/{id}")
    public boolean deleteMap(@PathVariable String id) {
        return mapService.deleteMap(id);
    }
}
