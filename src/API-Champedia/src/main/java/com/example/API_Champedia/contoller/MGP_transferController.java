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

import com.example.API_Champedia.dto.MGP_transferDTO;
import com.example.API_Champedia.model.MGP_transferModel;
import com.example.API_Champedia.service.MGP_transferService;

@RestController
@RequestMapping("/transfer")
@CrossOrigin("http://localhost:3000")
public class MGP_transferController {

    private final MGP_transferService transferService;

    public MGP_transferController(MGP_transferService transferService) {
        this.transferService = transferService;
    }

    // GET ALL TRANSFERS
    @GetMapping
    public List<MGP_transferDTO> getAllTransfers() {
        return transferService.getAllTransfers();
    }

    // GET TRANSFER BY ID
    @GetMapping("/{id}")
    public MGP_transferDTO getTransferById(@PathVariable String id) {
        return transferService.getTransferById(id);
    }

    // POST NEW TRANSFER
    @PostMapping
    public MGP_transferDTO saveTransfer(@RequestBody MGP_transferModel transfer) {
        return transferService.saveTransfer(transfer);
    }

    // UPDATE TRANSFER
    @PutMapping("/{id}")
    public MGP_transferDTO updateTransfer(
            @PathVariable String id,
            @RequestBody MGP_transferModel transfer) {
        return transferService.updateTransfer(id, transfer);
    }

    // DELETE TRANSFER
    @DeleteMapping("/{id}")
    public void deleteTransfer(@PathVariable String id) {
        transferService.deleteTransfer(id);
    }
}
