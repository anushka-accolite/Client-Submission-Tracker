package com.accolite.helper;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.CandidateSkillRepository;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.mock.web.MockMultipartFile;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;


import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class HelperTest {

    private CandidateSkillRepository candidateSkillRepository;
    private  CandidateRepository candidateRepository;
    @InjectMocks
    private Helper helper;

    @BeforeEach
    void setUp() {
        candidateSkillRepository = mock(CandidateSkillRepository.class);
        candidateRepository = mock(CandidateRepository.class);
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
    void testConvertExcelToListOfProduct_ValidExcel() throws IOException {
        // Mock Excel file data
        byte[] excelData = createSampleExcelData();
        MockMultipartFile mockFile = new MockMultipartFile("file", "test.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelData);

        // Mock repository behaviors
        when(candidateSkillRepository.existsBySkill(any(String.class))).thenReturn(false); // Adjust as needed
        when(candidateSkillRepository.save(any(CandidateSkill.class))).thenReturn(new CandidateSkill());
        when(candidateSkillRepository.findBySkills(any(String.class))).thenReturn(null);
        when(candidateRepository.save(any(Candidate.class))).thenReturn(new Candidate());

        // Perform the test
        List<Candidate> candidates = helper.convertExcelToListOfProduct(mockFile.getInputStream(), candidateSkillRepository, candidateRepository);

        // Assertions
        assertEquals(2, candidates.size());

        Candidate firstCandidate = candidates.get(0);
        assertEquals(1, firstCandidate.getCandidateId());
        assertEquals("john.doe@example.com", firstCandidate.getCandidateEmail());
        assertEquals("John Doe", firstCandidate.getCandidateName());
        assertEquals("Active", firstCandidate.getCandidateStatus());
        assertEquals(3, firstCandidate.getExperience());
        assertEquals(2, firstCandidate.getSkills().size());
        assertEquals("Java", firstCandidate.getSkills().get(0).getSkill());
        assertEquals("Python", firstCandidate.getSkills().get(1).getSkill());
        assertEquals("Yes", firstCandidate.getIsAccoliteEmployee());
        assertEquals(false, firstCandidate.getIsDeleted());

        // Additional assertions for the second candidate if needed
    }

    private byte[] createSampleExcelData() throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        try {
            // Create a sample Excel sheet
            String[] headers = {"CandidateId", "CandidateEmail", "CandidateName", "CandidateStatus", "Experience", "Skills", "IsAccoliteEmployee", "IsDeleted", "LastWorkingDay"};
            List<Object[]> data = Arrays.asList(
                    new Object[]{1, "john.doe@example.com", "John Doe", "Active", 3, "Java,Python", "Yes", false, null},
                    new Object[]{2, "jane.smith@example.com", "Jane Smith", "Inactive", 2, "C++,JavaScript", "No", true, null}
            );

            // Create sheet and write data
            XSSFSheet sheet = workbook.createSheet("Sheet1");
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            for (int i = 0; i < data.size(); i++) {
                Row row = sheet.createRow(i + 1);
                for (int j = 0; j < data.get(i).length; j++) {
                    Cell cell = row.createCell(j);
                    if (data.get(i)[j] instanceof String) {
                        cell.setCellValue((String) data.get(i)[j]);
                    } else if (data.get(i)[j] instanceof Integer) {
                        cell.setCellValue((Integer) data.get(i)[j]);
                    } else if (data.get(i)[j] instanceof Boolean) {
                        cell.setCellValue((Boolean) data.get(i)[j]);
                    }
                }
            }

            // Convert workbook to byte array
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            workbook.write(bos);
            return bos.toByteArray();
        } finally {
            workbook.close();
        }
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

        List<Candidate> candidates = Helper.convertExcelToListOfProduct(in, candidateSkillRepository,candidateRepository);

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
