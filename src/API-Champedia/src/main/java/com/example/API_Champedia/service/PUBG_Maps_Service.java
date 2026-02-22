package com.example.API_Champedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.API_Champedia.model.PUBG_Maps_Model;
import com.example.API_Champedia.repository.PUBG_Maps_Repository;

@Service
public class PUBG_Maps_Service {
    
    @Autowired
    private PUBG_Maps_Repository mapRepository;


    // Get All
    public List<PUBG_Maps_Model> getAllMaps(){
        return mapRepository.findAll();
    }

    // Get By Id
    public PUBG_Maps_Model getMapById(String id){
        Optional<PUBG_Maps_Model> map = mapRepository.findById(id);
        return map.orElse(null);
    }

    //Create
    public PUBG_Maps_Model addMap(PUBG_Maps_Model map){
        Optional<PUBG_Maps_Model> existingMap = mapRepository.findByMapNameIgnoreCase(map.getMapName());
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
    public PUBG_Maps_Model updateMap(String id, PUBG_Maps_Model mapData){
        Optional<PUBG_Maps_Model> existingMap = mapRepository.findById(id);
        if(existingMap.isPresent()){
            PUBG_Maps_Model map = existingMap.get();
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
