package com.submanager.subscriptionmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
public class  SubmanagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubmanagerApplication.class, args);
    }

}
