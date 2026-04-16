package com.submanager.subscriptionmanager.entity;


import com.submanager.subscriptionmanager.enums.BillingCycle;
import com.submanager.subscriptionmanager.enums.Status;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "subscriptions")
@Data
public class Subscription {


    @Id
    private String id;
    private String userId;  // Which user owns this subscription


    private String name;
    private String category;
    private double price;

    private BillingCycle billingCycle;
    private LocalDate renewalDate;

    private Status status;

    private boolean autoRenew;
    private String paymentMethod;
    private String description;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
