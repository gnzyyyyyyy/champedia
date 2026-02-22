package com.example.API_Champedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.API_Champedia.model.MLBB_Patches_Model;
import com.example.API_Champedia.repository.MLBB_Patches_Repository;

@Service
public class MLBB_Patches_Service {
    
    @Autowired
    private MLBB_Patches_Repository patchRepository;

    public List<MLBB_Patches_Model> getAllPatches() {
        return patchRepository.findAll();
    }

    // Get by ID
    public MLBB_Patches_Model getPatchById(String id) {
        Optional<MLBB_Patches_Model> patch = patchRepository.findById(id);
        return patch.orElse(null);
    }

    // Add patch
    public MLBB_Patches_Model addPatch(MLBB_Patches_Model patch) {
        return patchRepository.save(patch);
    }

    // Update
    public MLBB_Patches_Model updatePatch(String id, MLBB_Patches_Model patch) {
        Optional<MLBB_Patches_Model> existingPatch = patchRepository.findById(id);

        if(existingPatch.isPresent()) {
            MLBB_Patches_Model patchData = existingPatch.get();

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
