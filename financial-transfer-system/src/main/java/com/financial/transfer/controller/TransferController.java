package com.financial.transfer.controller;

import com.financial.transfer.model.Transfer;
import com.financial.transfer.service.FeeCalculatorService;
import com.financial.transfer.service.TransferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {

    @Autowired
    private TransferService transferService;
    
    @Autowired
    private FeeCalculatorService feeCalculatorService;
    
    @GetMapping
    public ResponseEntity<List<Transfer>> getAllTransfers() {
        return ResponseEntity.ok(transferService.getAllTransfers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transfer> getTransferById(@PathVariable Long id) {
        return ResponseEntity.ok(transferService.getTransferById(id));
    }
    
    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<Transfer>> getTransfersByAccount(@PathVariable String accountNumber) {
        return ResponseEntity.ok(transferService.getTransfersByAccount(accountNumber));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Transfer>> getTransfersByStatus(@PathVariable Transfer.TransferStatus status) {
        return ResponseEntity.ok(transferService.getTransfersByStatus(status));
    }
    
    @PostMapping
    public ResponseEntity<Transfer> scheduleTransfer(@Valid @RequestBody Transfer transfer) {
        try {
            Transfer scheduledTransfer = transferService.scheduleTransfer(transfer);
            return ResponseEntity.status(HttpStatus.CREATED).body(scheduledTransfer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Transfer> updateTransferStatus(
            @PathVariable Long id, 
            @RequestParam Transfer.TransferStatus status) {
        return ResponseEntity.ok(transferService.updateTransferStatus(id, status));
    }
    
    @GetMapping("/calculate-fee")
    public ResponseEntity<?> calculateFee(
            @RequestParam Double amount,
            @RequestParam LocalDate date) {
        Double fee = feeCalculatorService.calculateFee(amount, date);
        if (fee == null) {
            return ResponseEntity.badRequest().body("No applicable fee exists for this transfer date and amount combination");
        }
        return ResponseEntity.ok(fee);
    }
}
