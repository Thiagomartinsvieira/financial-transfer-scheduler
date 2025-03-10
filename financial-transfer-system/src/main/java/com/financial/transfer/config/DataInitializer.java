package com.financial.transfer.config;

import com.financial.transfer.model.Account;
import com.financial.transfer.model.Transfer;
import com.financial.transfer.repository.AccountRepository;
import com.financial.transfer.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private TransferRepository transferRepository;
    
    @Override
    public void run(String... args) {
        // Create sample accounts
        Account account1 = new Account("1234567890", "John Doe", 5000.0);
        Account account2 = new Account("0987654321", "Jane Smith", 3000.0);
        Account account3 = new Account("2345678901", "Bob Johnson", 2500.0);
        
        accountRepository.save(account1);
        accountRepository.save(account2);
        accountRepository.save(account3);
        
        // Create sample transfers
        Transfer transfer1 = new Transfer();
        transfer1.setOriginAccount("1234567890");
        transfer1.setDestinationAccount("0987654321");
        transfer1.setAmount(1000.0);
        transfer1.setFee(15.0);
        transfer1.setTransferDate(LocalDate.now().plusDays(5));
        transfer1.setScheduledDate(LocalDateTime.now());
        transfer1.setStatus(Transfer.TransferStatus.PENDING);
        
        Transfer transfer2 = new Transfer();
        transfer2.setOriginAccount("0987654321");
        transfer2.setDestinationAccount("2345678901");
        transfer2.setAmount(500.0);
        transfer2.setFee(10.0);
        transfer2.setTransferDate(LocalDate.now().plusDays(2));
        transfer2.setScheduledDate(LocalDateTime.now().minusDays(1));
        transfer2.setStatus(Transfer.TransferStatus.COMPLETED);
        
        transferRepository.save(transfer1);
        transferRepository.save(transfer2);
    }
}
