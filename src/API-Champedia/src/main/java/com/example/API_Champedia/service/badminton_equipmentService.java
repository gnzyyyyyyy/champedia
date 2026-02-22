package com.example.API_Champedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.API_Champedia.model.badminton_equipmentModel;
import com.example.API_Champedia.repository.badminton_equipmentRepository;

@Service
public class badminton_equipmentService {

    private badminton_equipmentRepository repository;

    public badminton_equipmentService(badminton_equipmentRepository repository) {
        this.repository = repository;
    }

    // GET ALL
    public List<badminton_equipmentModel> getAllEquipment() {
        return repository.findAll();
    }

    // GET BY ID
    public badminton_equipmentModel getEquipmentById(String id) {
        Optional<badminton_equipmentModel> equipment = repository.findById(id);
        return equipment.orElse(null);
    }

    // CREATE
    public badminton_equipmentModel saveEquipment(badminton_equipmentModel equipment) {

        // ❗ cek nama equipment sudah ada
        List<badminton_equipmentModel> existing =
                repository.findByName(equipment.getName());

        if (!existing.isEmpty()) {
            throw new RuntimeException(
                "Equipment name '" + equipment.getName() + "' already exists"
            );
        }

        // biarkan equipmentId null → MongoDB auto-generate
        return repository.save(equipment);
    }

    // UPDATE
    public badminton_equipmentModel updateEquipment(
            String id, badminton_equipmentModel equipment) {

        List<badminton_equipmentModel> existing =
                repository.findByName(equipment.getName());

        if (!existing.isEmpty()) {
            badminton_equipmentModel sameName = existing.get(0);

            // ❗ kalau nama dipakai equipment lain → tolak
            if (!sameName.getEquipmentId().equals(id)) {
                throw new RuntimeException(
                    "Equipment name '" + equipment.getName()
                    + "' already used by another equipment"
                );
            }
        }

        equipment.setEquipmentId(id);
        return repository.save(equipment);
    }

    // DELETE
    public void deleteEquipment(String id) {
        repository.deleteById(id);
    }

    // FILTER
    public List<badminton_equipmentModel> getByType(String type) {
        return repository.findByType(type);
    }

    public List<badminton_equipmentModel> getByBrand(String brand) {
        return repository.findByBrand(brand);
    }
}
