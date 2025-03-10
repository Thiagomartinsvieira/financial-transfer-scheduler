package com.financial.transfer.repository;

import com.financial.transfer.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    List<Transfer> findByOriginAccountOrDestinationAccount(String originAccount, String destinationAccount);
    List<Transfer> findByStatus(Transfer.TransferStatus status);
}
