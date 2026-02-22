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

import com.example.API_Champedia.model.MGP_newsModel;
import com.example.API_Champedia.service.MGP_newsService;

@RestController
@RequestMapping("/news")
@CrossOrigin("http://localhost:3000")
public class MGP_newsController {

    private final MGP_newsService newsService;

    public MGP_newsController(MGP_newsService newsService) {
        this.newsService = newsService;
    }

    // Get all
    @GetMapping
    public List<MGP_newsModel> getAllNews() {
        return newsService.getAllNews();
    }

    // Get by ID
    @GetMapping("/{id}")
    public MGP_newsModel getNewsByID(@PathVariable String id) {
        return newsService.getNewsByID(id);
    }

    // Create
    @PostMapping
    public MGP_newsModel createNews(@RequestBody MGP_newsModel news) {
        return newsService.saveNews(news);
    }

    // Update
    @PutMapping("/{id}")
    public MGP_newsModel updateNews(@PathVariable String id, @RequestBody MGP_newsModel news) {
        return newsService.updateNews(id, news);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable String id) {
        newsService.deleteNews(id);
    }
}
