package com.financial.transfer.dto;

import com.financial.transfer.model.Transfer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferResponse {

    private Long id;
    private String originAccount;
    private String destinationAccount;
    private Double amount;
    private Double fee;
    private LocalDate transferDate;
    private LocalDateTime scheduledDate;
    private Transfer.TransferStatus status;
    
    public static TransferResponse fromEntity(Transfer transfer) {
        TransferResponse response = new TransferResponse();
        response.setId(transfer.getId());
        response.setOriginAccount(transfer.getOriginAccount());
        response.setDestinationAccount(transfer.getDestinationAccount());
        response.setAmount(transfer.getAmount());
        response.setFee(transfer.getFee());
        response.setTransferDate(transfer.getTransferDate());
        response.setScheduledDate(transfer.getScheduledDate());
        response.setStatus(transfer.getStatus());
        return response;
    }
}
