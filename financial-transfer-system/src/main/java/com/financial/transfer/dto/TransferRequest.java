package com.financial.transfer.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransferRequest {

    @NotNull(message = "Origin account is required")
    @Pattern(regexp = "^\\d{10}$", message = "Origin account must be exactly 10 digits")
    private String originAccount;

    @NotNull(message = "Destination account is required")
    @Pattern(regexp = "^\\d{10}$", message = "Destination account must be exactly 10 digits")
    private String destinationAccount;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotNull(message = "Transfer date is required")
    private LocalDate transferDate;
}
