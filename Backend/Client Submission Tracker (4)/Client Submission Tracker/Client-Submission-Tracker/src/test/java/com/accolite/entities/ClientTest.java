package com.accolite.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ClientTest {

    @Test
    public void testGetterAndSetter() {
        Client client = new Client();

        // Set values
        client.setClientId(1);
        client.setClientName("Fedex");
        client.setClientResponseTimeinDays(7);
        client.setClientRequirement("Java Developer");
        client.setSkills("Java, Springboot, Hibernate");
        client.setIsDeleted(false);

        // Check values
        assertEquals(1, client.getClientId());
        assertEquals("Fedex", client.getClientName());
        assertEquals(7, client.getClientResponseTimeinDays());
        assertEquals("Java Developer", client.getClientRequirement());
        assertEquals("Java, Springboot, Hibernate", client.getSkills());
        assertFalse(client.getIsDeleted());

        // Update values
        client.setClientName("GS");
        client.setClientResponseTimeinDays(5);
        client.setClientRequirement("Full Stack Developer");
        client.setSkills("React, Node.js");
        client.setIsDeleted(true);

        // Check updated values
        assertEquals("GS", client.getClientName());
        assertEquals(5, client.getClientResponseTimeinDays());
        assertEquals("Full Stack Developer", client.getClientRequirement());
        assertEquals("React, Node.js", client.getSkills());
        assertTrue(client.getIsDeleted());
    }
}
