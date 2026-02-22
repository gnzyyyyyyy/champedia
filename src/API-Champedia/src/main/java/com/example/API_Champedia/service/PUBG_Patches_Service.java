package com.example.API_Champedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.API_Champedia.model.PUBG_Patches_Model;
import com.example.API_Champedia.repository.PUBG_Patches_Repository;

@Service
public class PUBG_Patches_Service {
    
    @Autowired
    private PUBG_Patches_Repository patchRepository;

    public List<PUBG_Patches_Model> getAllPatches() {
        return patchRepository.findAll();
    }

    // Get by ID
    public PUBG_Patches_Model getPatchById(String id) {
        Optional<PUBG_Patches_Model> patch = patchRepository.findById(id);
        return patch.orElse(null);
    }

    // Add patch
    public PUBG_Patches_Model addPatch(PUBG_Patches_Model patch) {
        return patchRepository.save(patch);
    }

    // Update
    public PUBG_Patches_Model updatePatch(String id, PUBG_Patches_Model patch) {
        Optional<PUBG_Patches_Model> existingPatch = patchRepository.findById(id);

        if(existingPatch.isPresent()) {
            PUBG_Patches_Model patchData = existingPatch.get();

            patchData.setPatchVersion(patch.getPatchVersion());
            patchData.setPatchDate(patch.getPatchDate());
            patchData.setPatchHighlights(patch.getPatchHighlights());

            return patchRepository.save(patchData);
        }

        return null;
    }

    // Delete
    public boolean deletePatch(String id) {
        if (patchRepository.existsById(id)) {
            patchRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
