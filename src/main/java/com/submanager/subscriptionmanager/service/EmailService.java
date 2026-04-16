package com.submanager.subscriptionmanager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendRenewalReminder(String toEmail, String subscriptionName,
                                    double price, LocalDate renewalDate) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("🔔 Subscription Renewal Reminder - " + subscriptionName);
        message.setText(
                "Hi there!\n\n" +
                        "Your subscription \"" + subscriptionName + "\" is renewing soon!\n\n" +
                        "📋 Details:\n" +
                        "   • Subscription: " + subscriptionName + "\n" +
                        "   • Price: ₹" + price + "\n" +
                        "   • Renewal Date: " + renewalDate + "\n\n" +
                        "If you don't want to continue, cancel it before " + renewalDate + ".\n\n" +
                        "— SubManager App"
        );

        mailSender.send(message);
        System.out.println("📧 Reminder sent to " + toEmail + " for " + subscriptionName);
    }
}
