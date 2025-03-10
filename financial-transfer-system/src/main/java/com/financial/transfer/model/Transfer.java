package com.financial.transfer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transfers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Origin account is required")
    @Pattern(regexp = "^\\d{10}$", message = "Origin account must be exactly 10 digits")
    private String originAccount;

    @NotNull(message = "Destination account is required")
    @Pattern(regexp = "^\\d{10}$", message = "Destination account must be exactly 10 digits")
    private String destinationAccount;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    private Double fee;

    @NotNull(message = "Transfer date is required")
    private LocalDate transferDate;

    private LocalDateTime scheduledDate;

    @Enumerated(EnumType.STRING)
    private TransferStatus status;

    public enum TransferStatus {
        PENDING, COMPLETED, CANCELLED
    }
}
