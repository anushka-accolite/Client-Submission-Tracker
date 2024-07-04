package com.accolite.service;

import com.accolite.entities.MailBody;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSendSimpleMessage() {
        // Given
        MailBody mailBody = new MailBody("recipient@example.com", "Test Subject", "Test Message");

        // When
        emailService.sendSimpleMessage(mailBody);

        // Then
        ArgumentCaptor<SimpleMailMessage> argumentCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(javaMailSender).send(argumentCaptor.capture());

        SimpleMailMessage capturedMessage = argumentCaptor.getValue();
        assertEquals(mailBody.to(), capturedMessage.getTo()[0]);
        assertEquals("vadla.mounika@accolitedigital.com", capturedMessage.getFrom());
        assertEquals(mailBody.subject(), capturedMessage.getSubject());
        assertEquals(mailBody.text(), capturedMessage.getText());
    }
}
