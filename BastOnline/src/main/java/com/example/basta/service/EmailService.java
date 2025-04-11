package com.example.basta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderApprovedEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your order has been shipped!");
        message.setText("Hello " + name + ",\n\nYour package has been approved and shipped. It will arrive at your address soon!\n\nThank you for your trust.\n\nYour FarmOnline 🌱");
        mailSender.send(message);
    }
    
    public void orderEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your order has been received!");
        message.setText("Hello " + name + ",\n\nYour order has been received. We will inform you as soon as we send a package!\n\nThank you for your trust.\n\nYour FarmOnline 🌱");
        mailSender.send(message);
    }
}