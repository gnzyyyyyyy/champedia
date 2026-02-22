package com.example.API_Champedia.contoller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.API_Champedia.model.badminton_equipmentModel;
import com.example.API_Champedia.service.badminton_equipmentService;

@RestController
@RequestMapping("/badminton/equipment")
@CrossOrigin(origins = "http://localhost:3000")
public class badminton_equipmentController {

    private badminton_equipmentService service;

    public badminton_equipmentController(badminton_equipmentService service) {
        this.service = service;
    }

    // GET ALL
    @GetMapping
    public List<badminton_equipmentModel> getAll() {
        return service.getAllEquipment();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public badminton_equipmentModel getById(@PathVariable String id) {
        return service.getEquipmentById(id);
    }

    // POST
    @PostMapping
    public badminton_equipmentModel create(@RequestBody badminton_equipmentModel equipment) {
        return service.saveEquipment(equipment);
    }

    // PUT
    @PutMapping("/{id}")
    public badminton_equipmentModel update(
            @PathVariable String id,
            @RequestBody badminton_equipmentModel equipment) {
        return service.updateEquipment(id, equipment);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteEquipment(id);
    }

    // FILTER
    @GetMapping("/type/{type}")
    public List<badminton_equipmentModel> getByType(@PathVariable String type) {
        return service.getByType(type);
    }

    @GetMapping("/brand/{brand}")
    public List<badminton_equipmentModel> getByBrand(@PathVariable String brand) {
        return service.getByBrand(brand);
    }
}
