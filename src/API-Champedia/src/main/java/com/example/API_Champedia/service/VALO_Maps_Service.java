package com.example.API_Champedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.API_Champedia.model.VALO_Maps_Model;
import com.example.API_Champedia.repository.VALO_Maps_Repository;

@Service
public class VALO_Maps_Service {
    
    @Autowired
    private VALO_Maps_Repository mapRepository;


    // Get All
    public List<VALO_Maps_Model> getAllMaps(){
        return mapRepository.findAll();
    }

    // Get By Id
    public VALO_Maps_Model getMapById(String id){
        Optional<VALO_Maps_Model> map = mapRepository.findById(id);
        return map.orElse(null);
    }

    //Create
    public VALO_Maps_Model addMap(VALO_Maps_Model map){
        Optional<VALO_Maps_Model> existingMap = mapRepository.findByMapNameIgnoreCase(map.getMapName());
        if(existingMap.isPresent()){
            throw new DuplicateMapNameException("Map with name " + map.getMapName() + " already exists.");
        }
        return mapRepository.save(map);
    }

    public class DuplicateMapNameException extends RuntimeException {
        public DuplicateMapNameException(String message) {
            super(message);
        }
    }

    // Update
    public VALO_Maps_Model updateMap(String id, VALO_Maps_Model mapData){
        Optional<VALO_Maps_Model> existingMap = mapRepository.findById(id);
        if(existingMap.isPresent()){
            VALO_Maps_Model map = existingMap.get();
            map.setMapName(mapData.getMapName());
            map.setMapImages(mapData.getMapImages());
            map.setMapLayout(mapData.getMapLayout());
            return mapRepository.save(map);
        }
        return null;
    }

    // Delete
    public boolean deleteMap(String id){
        if(mapRepository.existsById(id)){
            mapRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
