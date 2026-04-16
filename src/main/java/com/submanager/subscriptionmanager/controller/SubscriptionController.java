package com.submanager.subscriptionmanager.controller;

import com.submanager.subscriptionmanager.Dto.ExpenseSummary;
import com.submanager.subscriptionmanager.Dto.SubscriptionEntry;
import com.submanager.subscriptionmanager.entity.Subscription;
import com.submanager.subscriptionmanager.enums.Status;
import com.submanager.subscriptionmanager.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    // POST → Create a new subscription
    @PostMapping
    public ResponseEntity<Subscription> createSubscription(@Valid @RequestBody SubscriptionEntry entry) {
        Subscription saved = subscriptionService.createSubscription(entry);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // GET → Retrieve all subscriptions
    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }


    // GET by ID → Get one subscription
    @GetMapping("/{id}")
    public ResponseEntity<Subscription> getSubscriptionById(@PathVariable String id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        return ResponseEntity.ok(subscription);
    }

    // PUT → Update a subscription
    @PutMapping("/{id}")
    public ResponseEntity<Subscription> updateSubscription(@PathVariable String id, @Valid @RequestBody SubscriptionEntry entry) {
        Subscription updated = subscriptionService.updateSubscription(id, entry);
        return ResponseEntity.ok(updated);
    }

    // DELETE → Delete a subscription
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable String id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }


    // GET → Expense Summary
    @GetMapping("/summary")
    public ResponseEntity<ExpenseSummary> getExpenseSummary() {
        ExpenseSummary summary = subscriptionService.getExpenseSummary();
        return ResponseEntity.ok(summary);
    }


    // GET → Upcoming renewals (default 7 days, customizable)
    @GetMapping("/renewals")
    public ResponseEntity<List<Subscription>> getUpcomingRenewals(
            @RequestParam(defaultValue = "7") int days) {
        List<Subscription> renewals = subscriptionService.getUpcomingRenewals(days);
        return ResponseEntity.ok(renewals);
    }


    // PATCH → Cancel a subscription (without deleting)
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Subscription> cancelSubscription(@PathVariable String id) {
        Subscription cancelled = subscriptionService.cancelSubscription(id);
        return ResponseEntity.ok(cancelled);
    }

    // PATCH → Reactivate a cancelled subscription
    @PatchMapping("/{id}/activate")
    public ResponseEntity<Subscription> activateSubscription(@PathVariable String id) {
        Subscription activated = subscriptionService.activateSubscription(id);
        return ResponseEntity.ok(activated);
    }


    // GET → Filter by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Subscription>> getByStatus(@PathVariable Status status) {
        List<Subscription> subscriptions = subscriptionService.getByStatus(status);
        return ResponseEntity.ok(subscriptions);
    }

    // GET → Filter by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Subscription>> getByCategory(@PathVariable String category) {
        List<Subscription> subscriptions = subscriptionService.getByCategory(category);
        return ResponseEntity.ok(subscriptions);
    }





}
