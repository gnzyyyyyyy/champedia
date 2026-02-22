package com.example.API_Champedia.service;

import com.example.API_Champedia.model.MLBB_Heroes_Model;
import com.example.API_Champedia.repository.MLBB_Heroes_Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MLBB_Heroes_Service {

    @Autowired
    private MLBB_Heroes_Repository heroRepository;

    // GET ALL
    public List<MLBB_Heroes_Model> getAllHeroes() {
        return heroRepository.findAll();
    }

    // GET BY ID
    public MLBB_Heroes_Model getHeroById(String id) {
        Optional<MLBB_Heroes_Model> hero = heroRepository.findById(id);
        return hero.orElse(null);
    }

    // CREATE
    public MLBB_Heroes_Model addHero(MLBB_Heroes_Model hero) {
        Optional<MLBB_Heroes_Model> existingHero = heroRepository.findByHeroNameIgnoreCase(hero.getHeroName());

        if (existingHero.isPresent()) {
            throw new DuplicateHeroNameException("Hero with name " + hero.getHeroName() + " already exists.");
        }
        return heroRepository.save(hero);
    }

    public class DuplicateHeroNameException extends RuntimeException {
        public DuplicateHeroNameException(String message) {
            super(message);
        }
    }

    // UPDATE
    public MLBB_Heroes_Model updateHero(String id, MLBB_Heroes_Model heroData) {
        Optional<MLBB_Heroes_Model> existingHero = heroRepository.findById(id);

        if (existingHero.isPresent()) {
            MLBB_Heroes_Model hero = existingHero.get();

            hero.setHeroName(heroData.getHeroName());
            hero.setHeroImages(heroData.getHeroImages());
            hero.setHeroRole(heroData.getHeroRole());
            hero.setHeroDescription(heroData.getHeroDescription());

            return heroRepository.save(hero);
        }

        return null;
    }

    // DELETE
    public boolean deleteHero(String id) {
        if (heroRepository.existsById(id)) {
            heroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // *** ADDITION *** //
    // Get by Role
    public List<MLBB_Heroes_Model> getHeroesByRole(String role) {
        return heroRepository.findByHeroRole(role);
    }
}

