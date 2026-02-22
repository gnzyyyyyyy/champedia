package com.example.API_Champedia.contoller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Champedia.service.PUBG_Patches_Service;
import com.example.API_Champedia.model.PUBG_Patches_Model;

@RestController
@RequestMapping("/pubg_patches")
@CrossOrigin("*")
public class PUBG_Patches_Controller {
    @Autowired
    private PUBG_Patches_Service PUBG_patches_service;

    // get all
    @GetMapping
    public List<PUBG_Patches_Model> getAllPatches() {
        return PUBG_patches_service.getAllPatches();
    }

    // get by id
    @GetMapping("/{id}")
    public PUBG_Patches_Model getPatchById(@PathVariable String id) {
        return PUBG_patches_service.getPatchById(id);
    }

    // add
    @PostMapping
    public PUBG_Patches_Model addPatch(@RequestBody PUBG_Patches_Model patch) {
        return PUBG_patches_service.addPatch(patch);
    }

    //update patch
    @PutMapping("/{id}")
    public PUBG_Patches_Model updatePatch(@PathVariable String id, @RequestBody PUBG_Patches_Model patch) {
        return PUBG_patches_service.updatePatch(id, patch);
    }

    //delete patch
    @DeleteMapping("/{id}")
    public boolean deletePatch(@PathVariable String id) {
        return PUBG_patches_service.deletePatch(id);
    }
}
