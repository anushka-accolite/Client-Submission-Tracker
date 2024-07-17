package com.accolite.helper;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.CandidateSkillRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HelperTest {

    @Mock
    private CandidateSkillRepository candidateSkillRepository;

    @Mock
    private CandidateRepository candidateRepository;

    @InjectMocks
    private Helper helper;

    @BeforeEach
    void setUp() {
        // Initialize any setup if needed
    }

    @Test
    void testCheckExcelFormat_ValidExcelFile() {
        // Prepare a valid Excel file
        MultipartFile file = createMockMultipartFile("test.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        assertTrue(Helper.checkExcelFormat(file));
    }

    @Test
    void testCheckExcelFormat_InvalidFileType() {
        // Prepare a non-Excel file
        MultipartFile file = createMockMultipartFile("test.txt", "text/plain");

        assertFalse(Helper.checkExcelFormat(file));
    }

//    @Test
//    void testConvertExcelToListOfProduct_WithExistingSkills() throws IOException {
//        // Prepare test data in the form of an input stream
//        String testData = "CandidateId,CandidateEmail,CandidateName,CandidateStatus,Experience,Skills,IsAccoliteEmployee,IsDeleted,LastWorkingDay\n"
//                + "2,existing@example.com,Jane Doe,Inactive,3,Java,No,true,2024-06-30\n";
//        InputStream inputStream = new ByteArrayInputStream(testData.getBytes());
//
//        // Mock behavior of CandidateSkillRepository
//        when(candidateSkillRepository.existsBySkill("Java")).thenReturn(true);
//        CandidateSkill mockSkill = new CandidateSkill();
//        mockSkill.setSkill_id(1);
//        mockSkill.setSkill("Java");
//        when(candidateSkillRepository.findBySkills("Java")).thenReturn(mockSkill);
//
//        // Mock behavior of CandidateRepository
//        when(candidateRepository.save(new Candidate())).thenReturn(new Candidate());
//
//        // Perform the conversion
//        List<Candidate> candidates = Helper.convertExcelToListOfProduct(inputStream, candidateSkillRepository, candidateRepository);
//
//        // Assertions
//        assertNotNull(candidates);
//        assertFalse(candidates.isEmpty());
//
//        // Validate the first candidate in the list
//        Candidate candidate = candidates.get(0);
//        assertNotNull(candidate);
//        assertEquals(2, candidate.getCandidateId());
//        assertEquals("existing@example.com", candidate.getCandidateEmail());
//        assertEquals("Jane Doe", candidate.getCandidateName());
//        assertEquals("Inactive", candidate.getCandidateStatus());
//        assertEquals(3, candidate.getExperience());
//        assertNotNull(candidate.getSkills());
//        assertEquals(1, candidate.getSkills().size());
//        assertEquals("Java", candidate.getSkills().get(0).getSkill());
//        assertEquals("No", candidate.getIsAccoliteEmployee());
//        assertTrue(candidate.getIsDeleted());
//        // Additional assertions based on expected behavior of the method
//    }

    private MockMultipartFile createMockMultipartFile(String fileName, String contentType) {
        return new MockMultipartFile(fileName, fileName, contentType, new byte[0]);
    }
}
