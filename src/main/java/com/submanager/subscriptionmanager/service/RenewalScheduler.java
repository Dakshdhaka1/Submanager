package com.submanager.subscriptionmanager.service;

import com.submanager.subscriptionmanager.Repository.SubscriptionRepository;
import com.submanager.subscriptionmanager.Repository.UserRepository;
import com.submanager.subscriptionmanager.entity.Subscription;
import com.submanager.subscriptionmanager.enums.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RenewalScheduler {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    // Runs every day at 8:00 AM
    @Scheduled(cron = "0 0 8 * * * ")
    public void sendRenewalReminders() {
        System.out.println("⏰ Running renewal reminder check...");

        LocalDate today = LocalDate.now();
        LocalDate threeDaysLater = today.plusDays(3);

        // Find all ACTIVE subscriptions renewing in the next 3 days
        List<Subscription> upcomingRenewals =
                subscriptionRepository.findByRenewalDateBetweenAndStatus(today, threeDaysLater, Status.ACTIVE);

        System.out.println("📋 Found " + upcomingRenewals.size() + " subscriptions renewing soon");

        for (Subscription sub : upcomingRenewals) {
            // Find the user who owns this subscription
            userRepository.findById(sub.getUserId()).ifPresent(user -> {
                if (user.getEmail() != null) {
                    emailService.sendRenewalReminder(
                            user.getEmail(),
                            sub.getName(),
                            sub.getPrice(),
                            sub.getRenewalDate()
                    );
                }
            });
        }

        System.out.println("✅ Renewal reminders sent!");
    }
}
