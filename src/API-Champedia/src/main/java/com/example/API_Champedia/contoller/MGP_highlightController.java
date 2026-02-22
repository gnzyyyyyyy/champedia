package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.model.MGP_highlightModel;
import com.example.API_Champedia.service.MGP_highlightService;

@RestController
@RequestMapping("/highlight")
@CrossOrigin("http://localhost:3000")
public class MGP_highlightController {
    
    private final MGP_highlightService highlightService;

    public MGP_highlightController(MGP_highlightService highlightService) {
        this.highlightService = highlightService;
    }

    //Get all
    @GetMapping
    public List<MGP_highlightModel> getAllHighlights() {
        return highlightService.getAllHighlights();
    }

    //Get by ID
    @GetMapping("/{id}")
    public MGP_highlightModel getHighlight(String id) {
        return highlightService.getHighlight(id);
    }

    //Post
    @PostMapping
    public MGP_highlightModel saveHighlight(@RequestBody MGP_highlightModel highlight) {
        return highlightService.saveHighlight(highlight);
    }

    //Update
    @PutMapping("/{id}")
    public MGP_highlightModel updateHighlight(@PathVariable String id, @RequestBody MGP_highlightModel highlight) {
        return highlightService.updateHighlight(id, highlight);
    }

    //Delete
    @DeleteMapping("/{id}")
    public void deleteHighlight(@PathVariable String id) {
        highlightService.deleteHighlight(id);
    }

}
