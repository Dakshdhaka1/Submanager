package com.submanager.subscriptionmanager.service;

import com.submanager.subscriptionmanager.Dto.ExpenseSummary;
import com.submanager.subscriptionmanager.Dto.SubscriptionEntry;
import com.submanager.subscriptionmanager.Repository.SubscriptionRepository;
import com.submanager.subscriptionmanager.entity.Subscription;
import com.submanager.subscriptionmanager.entity.User;
import com.submanager.subscriptionmanager.enums.BillingCycle;
import com.submanager.subscriptionmanager.enums.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    // Method to save a new subscription
    public Subscription createSubscription(SubscriptionEntry entry) {
        // 1. Create a fresh, empty Subscription entity
        Subscription subscription = new Subscription();

        // 2. Map data from the incoming Entry (DTO) to our Entity
        subscription.setName(entry.getName());
        subscription.setCategory(entry.getCategory());
        subscription.setPrice(entry.getPrice());
        subscription.setBillingCycle(entry.getBillingCycle());
        subscription.setRenewalDate(entry.getRenewalDate());
        subscription.setAutoRenew(entry.isAutoRenew());
        subscription.setPaymentMethod(entry.getPaymentMethod());
        subscription.setDescription(entry.getDescription());

        // 3. Set default fields that the user didn't provide
        subscription.setStatus(Status.ACTIVE); // Assuming you have an ACTIVE status
        subscription.setUserId(getCurrentUserId());  // Link to logged-in user
        subscription.setCreatedAt(LocalDateTime.now());



        // 4. Save it to MongoDB and return the saved result
        return subscriptionRepository.save(subscription);
    }

    // Method to get all subscriptions
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findByUserId(getCurrentUserId());
    }


    // Get a single subscription by ID
    public Subscription getSubscriptionById(String id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found with id: " + id));
    }

    // Update an existing subscription
    public Subscription updateSubscription(String id, SubscriptionEntry entry) {
        Subscription subscription = getSubscriptionById(id); // Find existing one first

        // Update only the fields that the user provides
        subscription.setName(entry.getName());
        subscription.setCategory(entry.getCategory());
        subscription.setPrice(entry.getPrice());
        subscription.setBillingCycle(entry.getBillingCycle());
        subscription.setRenewalDate(entry.getRenewalDate());
        subscription.setAutoRenew(entry.isAutoRenew());
        subscription.setPaymentMethod(entry.getPaymentMethod());
        subscription.setDescription(entry.getDescription());
        subscription.setUpdatedAt(LocalDateTime.now()); // Track when it was last updated

        return subscriptionRepository.save(subscription);
    }

    // Delete a subscription
    public void deleteSubscription(String id) {
        Subscription subscription = getSubscriptionById(id); // Make sure it exists first
        subscriptionRepository.delete(subscription);
    }


    // Expense Summary
    public ExpenseSummary getExpenseSummary() {
        List<Subscription> all = subscriptionRepository.findByUserId(getCurrentUserId());
        ExpenseSummary summary = new ExpenseSummary();
        // Count active vs cancelled
        summary.setActiveCount((int) all.stream()
                .filter(s -> s.getStatus() == Status.ACTIVE).count());
        summary.setCancelledCount((int) all.stream()
                .filter(s -> s.getStatus() == Status.CANCELLED).count());



        // Calculate monthly expense (convert yearly to monthly too)
        double monthlyTotal = all.stream()
                .filter(s -> s.getStatus() == Status.ACTIVE)
                .mapToDouble(s -> {
                    if (s.getBillingCycle() == BillingCycle.YEARLY) {
                        return s.getPrice() / 12;  // Convert yearly price to monthly
                    }
                    return s.getPrice();
                }).sum();
        summary.setTotalMonthlyExpense(Math.round(monthlyTotal * 100.0) / 100.0);
        summary.setTotalYearlyExpense(Math.round(monthlyTotal * 12 * 100.0) / 100.0);



        // Group spending by category
        Map<String, Double> byCategory = all.stream()
                .filter(s -> s.getStatus() == Status.ACTIVE)
                .collect(Collectors.groupingBy(
                        Subscription::getCategory,
                        Collectors.summingDouble(Subscription::getPrice)
                ));
        summary.setExpenseByCategory(byCategory);
        return summary;
    }



    // Get subscriptions renewing soon (within X days)
    public List<Subscription> getUpcomingRenewals(int days) {
        LocalDate today = LocalDate.now();
        LocalDate deadline = today.plusDays(days);
        return subscriptionRepository.findByRenewalDateBetweenAndStatus(today, deadline, Status.ACTIVE);
    }


    // Cancel a subscription
    public Subscription cancelSubscription(String id) {
        Subscription subscription = getSubscriptionById(id);
        subscription.setStatus(Status.CANCELLED);
        subscription.setUpdatedAt(LocalDateTime.now());
        return subscriptionRepository.save(subscription);
    }

    // Reactivate a subscription
    public Subscription activateSubscription(String id) {
        Subscription subscription = getSubscriptionById(id);
        subscription.setStatus(Status.ACTIVE);
        subscription.setUpdatedAt(LocalDateTime.now());
        return subscriptionRepository.save(subscription);
    }


    // Get subscriptions by status (ACTIVE or CANCELLED)
    public List<Subscription> getByStatus(Status status) {
        return subscriptionRepository.findByStatus(status);
    }

    // Get subscriptions by category
    public List<Subscription> getByCategory(String category) {
        return subscriptionRepository.findByCategory(category);
    }

    // Helper: Get the currently logged-in user's ID
    private String getCurrentUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }






}
