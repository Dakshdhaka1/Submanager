package com.submanager.subscriptionmanager.Dto;

import com.submanager.subscriptionmanager.enums.BillingCycle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SubscriptionEntry {

    @NotBlank(message = "Subscription name is required!")
    private String name;

    @NotBlank(message = "Category is required!")
    private String category;

    @Positive(message = "Price must be greater than 0!")
    private double price;

    @NotNull(message = "Billing cycle is required!")
    private BillingCycle billingCycle;    // MONTHLY or YEARLY

    private LocalDate renewalDate;        // When does it renew next?

    private boolean autoRenew;            // Does it auto-renew?

    private String paymentMethod;         // UPI, Credit Card, etc.

    private String description;           // Optional note
}
