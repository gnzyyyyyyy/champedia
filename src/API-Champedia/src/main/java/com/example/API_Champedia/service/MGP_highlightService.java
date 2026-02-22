package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.MGP_highlightModel;
import com.example.API_Champedia.repository.MGP_highlightRepository;

@Service
public class MGP_highlightService {

    private final MGP_highlightRepository highlightRepository;
    
    @Autowired
    public MGP_highlightService(MGP_highlightRepository highlightRepository) {
        this.highlightRepository = highlightRepository;
    }

    //Get all
    public List<MGP_highlightModel> getAllHighlights() {
        return highlightRepository.findAll();
    }

    //Get by ID
    public MGP_highlightModel getHighlight(String id) {
        Optional<MGP_highlightModel> highlight = highlightRepository.findById(id);
        return highlight.orElse(null);
    }

    //Save
    public MGP_highlightModel saveHighlight(MGP_highlightModel highlight) {
        
        //Checking existing of highlight
        List<MGP_highlightModel> existing = highlightRepository.findByhighlightTitle(highlight.gethighlightTitle());
        if(!existing.isEmpty())
            throw new RuntimeException("Highlight title '" + highlight.gethighlightTitle() + "' already exists");
        
        return highlightRepository.save(highlight);
    }

    //Update
    public MGP_highlightModel updateHighlight(String id, MGP_highlightModel highlight) {

        //Checking existing of highlight
        List<MGP_highlightModel> existing = highlightRepository.findByhighlightTitle(highlight.gethighlightTitle());
        if(!existing.isEmpty())
            throw new RuntimeException("Highlight title '" + highlight.gethighlightTitle() + "' already exists");
        
        highlight.sethighlightID(id);
        return highlightRepository.save(highlight);
    }

    //Delete
    public void deleteHighlight(String id) {
        highlightRepository.deleteById(id);
    }
    
}
