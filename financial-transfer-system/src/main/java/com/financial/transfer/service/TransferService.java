package com.financial.transfer.service;

import com.financial.transfer.model.Transfer;
import com.financial.transfer.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransferService {

    @Autowired
    private TransferRepository transferRepository;
    
    @Autowired
    private FeeCalculatorService feeCalculatorService;
    
    public List<Transfer> getAllTransfers() {
        return transferRepository.findAll();
    }
    
    public Transfer getTransferById(Long id) {
        return transferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer not found with id: " + id));
    }
    
    public List<Transfer> getTransfersByAccount(String accountNumber) {
        return transferRepository.findByOriginAccountOrDestinationAccount(accountNumber, accountNumber);
    }
    
    public List<Transfer> getTransfersByStatus(Transfer.TransferStatus status) {
        return transferRepository.findByStatus(status);
    }
    
    public Transfer scheduleTransfer(Transfer transfer) {
        // Calculate fee
        Double fee = feeCalculatorService.calculateFee(transfer.getAmount(), transfer.getTransferDate());
        
        if (fee == null) {
            throw new IllegalArgumentException("No applicable fee exists for this transfer date and amount combination");
        }
        
        // Set additional fields
        transfer.setFee(fee);
        transfer.setScheduledDate(LocalDateTime.now());
        transfer.setStatus(Transfer.TransferStatus.PENDING);
        
        return transferRepository.save(transfer);
    }
    
    public Transfer updateTransferStatus(Long id, Transfer.TransferStatus status) {
        Transfer transfer = getTransferById(id);
        transfer.setStatus(status);
        return transferRepository.save(transfer);
    }
}
