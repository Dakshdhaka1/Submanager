package com.submanager.subscriptionmanager.Dto;

import lombok.Data;
import java.util.Map;

@Data
public class ExpenseSummary {

    private double totalMonthlyExpense;
    private double totalYearlyExpense;
    private int activeCount;
    private int cancelledCount;
    private Map<String, Double> expenseByCategory;  // e.g., {"Entertainment": 500, "Music": 200}
}
