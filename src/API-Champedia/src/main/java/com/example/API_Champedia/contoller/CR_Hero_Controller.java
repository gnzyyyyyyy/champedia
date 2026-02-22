package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.CR_Hero_Model;
import com.example.API_Champedia.service.CR_Hero_Service;
import com.example.API_Champedia.service.CR_Hero_Service.DuplicateCardNameException;

@RestController
@RequestMapping("/cr_hero")
@CrossOrigin(origins = "*")
public class CR_Hero_Controller {

    @Autowired
    private CR_Hero_Service cardService;

    // GET ALL
    @GetMapping
    public List<CR_Hero_Model> getAllCards() {
        return cardService.getAllCards();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public CR_Hero_Model getCardById(@PathVariable String id) {
        return cardService.getCardById(id);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> addCard(@RequestBody CR_Hero_Model card) {
        try {
            return ResponseEntity.ok(cardService.addCard(card));
        } catch (CR_Hero_Service.InvalidCardCostException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (DuplicateCardNameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCard(
            @PathVariable String id,
            @RequestBody CR_Hero_Model cardData
    ) {
        try {
            return ResponseEntity.ok(cardService.updateCard(id, cardData));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public boolean deleteCard(@PathVariable String id) {
        return cardService.deleteCard(id);
    }

    // *** ADDITIONS *** //

    // Get by Type
    @GetMapping("/type/{type}")
    public List<CR_Hero_Model> getCardsByType(@PathVariable String type) {
        return cardService.getCardsByType(type);
    }

    // Get by Rarity
    @GetMapping("/rarity/{rarity}")
    public List<CR_Hero_Model> getCardsByRarity(@PathVariable String rarity) {
        return cardService.getCardsByRarity(rarity);
    }
}


