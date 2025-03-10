package com.financial.transfer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @Pattern(regexp = "^\\d{10}$", message = "Account number must be exactly 10 digits")
    private String accountNumber;
    
    private String accountName;
    private Double balance;
}
