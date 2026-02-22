package com.example.API_Champedia.service;

import com.example.API_Champedia.model.CR_Cards_Model;
import com.example.API_Champedia.repository.CR_Cards_Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CR_Cards_Service {

    @Autowired
    private CR_Cards_Repository cardRepository;

    public static class InvalidCardCostException extends RuntimeException {
        public InvalidCardCostException(String message) {
            super(message);
        }
    }

    private void validateCardCost(int cost) {
        if (cost < 0 || cost > 10) {
            throw new InvalidCardCostException(
                "Card cost must be between 0 and 10"
            );
        }
    }
    // GET ALL
    public List<CR_Cards_Model> getAllCards() {
        return cardRepository.findAll();
    }

    // GET BY ID
    public CR_Cards_Model getCardById(String id) {
        Optional<CR_Cards_Model> card = cardRepository.findById(id);
        return card.orElse(null);
    }

    // CREATE
    public CR_Cards_Model addCard(CR_Cards_Model card) {
        validateCardCost(card.getCardCost());
        Optional<CR_Cards_Model> existingCard =
                cardRepository.findByCardNameIgnoreCase(card.getCardName());

        if (existingCard.isPresent()) {
            throw new DuplicateCardNameException(
                    "Card with name " + card.getCardName() + " already exists."
            );
        }

        return cardRepository.save(card);
    }

    public class DuplicateCardNameException extends RuntimeException {
        public DuplicateCardNameException(String message) {
            super(message);
        }
    }

    // UPDATE
    public CR_Cards_Model updateCard(String id, CR_Cards_Model cardData) {
        validateCardCost(cardData.getCardCost());
        Optional<CR_Cards_Model> existingCard = cardRepository.findById(id);

        if (existingCard.isPresent()) {
            CR_Cards_Model card = existingCard.get();

            card.setCardName(cardData.getCardName());
            card.setCardImages(cardData.getCardImages());
            card.setCardCost(cardData.getCardCost());
            card.setCardType(cardData.getCardType());
            card.setCardRarity(cardData.getCardRarity());
            card.setHeroDescription(cardData.getHeroDescription());

            return cardRepository.save(card);
        }

        return null;
    }

    // DELETE
    public boolean deleteCard(String id) {
        if (cardRepository.existsById(id)) {
            cardRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // *** ADDITIONS *** //

    // Get by Type
    public List<CR_Cards_Model> getCardsByType(String type) {
        return cardRepository.findByCardType(type);
    }

    // Get by Rarity
    public List<CR_Cards_Model> getCardsByRarity(String rarity) {
        return cardRepository.findByCardRarity(rarity);
    }
}
