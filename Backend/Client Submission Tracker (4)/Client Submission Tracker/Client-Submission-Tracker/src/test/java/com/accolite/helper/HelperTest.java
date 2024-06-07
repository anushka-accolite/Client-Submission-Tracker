package com.accolite.helper;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateSkillRepository;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class HelperTest {

    private CandidateSkillRepository candidateSkillRepository;

    @BeforeEach
    void setUp() {
        candidateSkillRepository = Mockito.mock(CandidateSkillRepository.class);
    }

    // Test for checkExcelFormat
    @Test
    void testCheckExcelFormatWithValidFile() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                new byte[0]
        );

        assertTrue(Helper.checkExcelFormat(file));
    }

    @Test
    void testCheckExcelFormatWithInvalidFile() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                new byte[0]
        );

        assertFalse(Helper.checkExcelFormat(file));
    }

    // Test for convertExcelToListOfProduct
    @Test
    void testConvertExcelToListOfProduct() throws IOException {
        // Create a sample Excel file in memory
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            var sheet = workbook.createSheet("Sheet1");
            var header = sheet.createRow(0);
            header.createCell(0).setCellValue("CandidateId");
            header.createCell(1).setCellValue("CandidateEmail");
            header.createCell(2).setCellValue("CandidateName");
            header.createCell(3).setCellValue("CandidateStatus");
            header.createCell(4).setCellValue("Experience");
            header.createCell(5).setCellValue("Skills");
            header.createCell(6).setCellValue("IsAccoliteEmployee");
            header.createCell(7).setCellValue("IsDeleted");
            header.createCell(8).setCellValue("LastWorkingDay");

            var row = sheet.createRow(1);
            row.createCell(0).setCellValue(1);
            row.createCell(1).setCellValue("test@example.com");
            row.createCell(2).setCellValue("John Doe");
            row.createCell(3).setCellValue("Active");
            row.createCell(4).setCellValue(5);
            row.createCell(5).setCellValue("Java");
            row.createCell(6).setCellValue("Yes");
            row.createCell(7).setCellValue(false);
            row.createCell(8).setCellValue("2024-12-31");

            workbook.write(out);
        }

        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        // Mock the CandidateSkillRepository
        CandidateSkill javaSkill = new CandidateSkill();
        javaSkill.setSkill("Java");
        when(candidateSkillRepository.existsBySkill("Java")).thenReturn(false);

        List<Candidate> candidates = Helper.convertExcelToListOfProduct(in, candidateSkillRepository);

        assertNotNull(candidates);
        assertEquals(1, candidates.size());

        Candidate candidate = candidates.get(0);
        assertNotNull(candidate);
        assertEquals(1, candidate.getCandidateId());
        assertEquals("test@example.com", candidate.getCandidateEmail());
        assertEquals("John Doe", candidate.getCandidateName());
        assertEquals("Active", candidate.getCandidateStatus());
        assertEquals(5, candidate.getExperience());
        assertNotNull(candidate.getSkills());
        assertEquals("Java", candidate.getSkills().get(0).getSkill());
        assertEquals("Yes", candidate.getIsAccoliteEmployee());
        assertFalse(candidate.getIsDeleted());
       // assertNotNull(candidate.getLast_working_day());
    }

    @Test
    void testConvertExcelToListOfProductWithExistingSkill() throws IOException {
        // Create a sample Excel file in memory
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            var sheet = workbook.createSheet("Sheet1");
            var header = sheet.createRow(0);
            header.createCell(0).setCellValue("CandidateId");
            header.createCell(1).setCellValue("CandidateEmail");
            header.createCell(2).setCellValue("CandidateName");
            header.createCell(3).setCellValue("CandidateStatus");
            header.createCell(4).setCellValue("Experience");
            header.createCell(5).setCellValue("Skills");
            header.createCell(6).setCellValue("IsAccoliteEmployee");
            header.createCell(7).setCellValue("IsDeleted");
            header.createCell(8).setCellValue("LastWorkingDay");

            var row = sheet.createRow(1);
            row.createCell(0).setCellValue(2);
            row.createCell(1).setCellValue("existing@example.com");
            row.createCell(2).setCellValue("Jane Doe");
            row.createCell(3).setCellValue("Inactive");
            row.createCell(4).setCellValue(3);
            row.createCell(5).setCellValue("Python");
            row.createCell(6).setCellValue("No");
            row.createCell(7).setCellValue(true);
            row.createCell(8).setCellValue("2024-06-30");

            workbook.write(out);
        }

        ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

        // Mock the CandidateSkillRepository
        CandidateSkill pythonSkill = new CandidateSkill();
        pythonSkill.setSkill("Python");
        when(candidateSkillRepository.existsBySkill("Python")).thenReturn(true);
        when(candidateSkillRepository.findBySkills("Python")).thenReturn(pythonSkill);

        List<Candidate> candidates = Helper.convertExcelToListOfProduct(in, candidateSkillRepository);

        // Verify results
        assertNotNull(candidates, "Candidates list should not be null");
        assertEquals(1, candidates.size(), "Candidates list size should be 1");

        Candidate candidate = candidates.get(0);
        assertNotNull(candidate, "Candidate should not be null");
        assertEquals(2, candidate.getCandidateId(), "CandidateId mismatch");
        assertEquals("existing@example.com", candidate.getCandidateEmail(), "CandidateEmail mismatch");
        assertEquals("Jane Doe", candidate.getCandidateName(), "CandidateName mismatch");
        assertEquals("Inactive", candidate.getCandidateStatus(), "CandidateStatus mismatch");
        assertEquals(3, candidate.getExperience(), "Experience mismatch");
        assertNotNull(candidate.getSkills(), "Skills should not be null");
        assertEquals("Python", candidate.getSkills().get(0).getSkill(), "Skill mismatch");
        assertEquals("No", candidate.getIsAccoliteEmployee(), "IsAccoliteEmployee mismatch");
        assertTrue(candidate.getIsDeleted(), "IsDeleted mismatch");
       // assertNotNull(candidate.getLast_working_day(), "LastWorkingDay should not be null");
    }

}
