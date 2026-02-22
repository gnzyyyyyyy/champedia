package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.MGP_newsModel;
import com.example.API_Champedia.repository.MGP_newsRepository;

@Service
public class MGP_newsService {
    
    @Autowired
    private MGP_newsRepository newsRepository;

    //Constructor
    public MGP_newsService(MGP_newsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    //Get all news
    public List<MGP_newsModel> getAllNews(){
        return newsRepository.findAll();
    }

    //Get news by ID
    public MGP_newsModel getNewsByID(String newsID){
        Optional<MGP_newsModel> news = newsRepository.findById(newsID);
        return news.orElse(null);
    }

    //Save news
    public MGP_newsModel saveNews(MGP_newsModel news){
        
        //Check existing of news
        List<MGP_newsModel> existing = newsRepository.findBynewsTitle(news.getnewsTitle());
        if (!existing.isEmpty()){
            throw new RuntimeException("News title '" + news.getnewsTitle() + "' already exists");
        }

        return newsRepository.save(news);
    }

    //Update news
    public MGP_newsModel updateNews(String newsID, MGP_newsModel news){

        //Checking existing of news
        List<MGP_newsModel> existing = newsRepository.findBynewsTitle(news.getnewsTitle());
        if(!existing.isEmpty()){
            throw new RuntimeException("News title '" + news.getnewsTitle() + "' already exists");
        }

        news.setnewsID(newsID);
        return newsRepository.save(news);
    }

    //Delete news
    public void deleteNews(String newsID){
        newsRepository.deleteById(newsID);
    }
}