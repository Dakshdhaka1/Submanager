package com.submanager.subscriptionmanager.Repository;

import com.submanager.subscriptionmanager.entity.Subscription;
import com.submanager.subscriptionmanager.enums.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface SubscriptionRepository extends MongoRepository<Subscription, String> {


    // Find subscriptions renewing between two dates AND are ACTIVE
    List<Subscription> findByRenewalDateBetweenAndStatus(LocalDate start, LocalDate end, Status status);
    // Find all subscriptions by status
    List<Subscription> findByStatus(Status status);
    // Find subscriptions by category
    List<Subscription> findByCategory(String category);

    List<Subscription> findByUserId(String userId);

}
