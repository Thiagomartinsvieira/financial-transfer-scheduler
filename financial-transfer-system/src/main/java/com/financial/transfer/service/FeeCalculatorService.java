package com.financial.transfer.service;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class FeeCalculatorService {

    /**
     * Calculates the fee for a transfer based on the amount and date.
     * 
     * @param amount The transfer amount
     * @param date The transfer date
     * @return The calculated fee or null if no applicable fee exists
     */
    public Double calculateFee(Double amount, LocalDate date) {
        // Check if it's a weekend
        boolean isWeekend = isWeekend(date);
        
        // No fee available for transfers on weekends with amount > 1000
        if (isWeekend && amount > 1000) {
            return null;
        }
        
        // Sample fee calculation
        double baseFee = amount * 0.01; // 1% fee
        double weekendSurcharge = isWeekend ? 5.0 : 0.0; // $5 surcharge on weekends
        
        return Math.max(baseFee + weekendSurcharge, 2.0); // Minimum fee of $2
    }
    
    private boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }
}
