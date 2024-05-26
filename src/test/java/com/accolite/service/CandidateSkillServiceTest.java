package com.accolite.service;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.CandidateSkillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class CandidateSkillServiceTest {

    @Mock
    private CandidateSkillRepository candidateSkillRepository;

    @Mock
    private CandidateRepository candidateRepository;

    @InjectMocks
    private CandidateSkillService candidateSkillService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddSkillToCandidate() {
        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);
        candidate.setSkills(new ArrayList<>()); // Initialize the skills list

        CandidateSkill skill = new CandidateSkill();
        skill.setSkill_id(1);
        skill.setSkill("Java");

        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate));
        when(candidateSkillRepository.findBySkill("Java")).thenReturn(null);
        when(candidateSkillRepository.save(any())).thenReturn(skill);

        CandidateSkill addedSkill = candidateSkillService.addSkillToCandidate(1, "Java");

        assertEquals(skill, addedSkill);
        assertEquals(1, candidate.getSkills().size());

        verify(candidateRepository, times(1)).findById(1);
        verify(candidateSkillRepository, times(1)).findBySkill("Java");
        verify(candidateSkillRepository, times(1)).save(any());
    }


    @Test
    public void testGetAllSkillsForCandidate() {
        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);
        List<CandidateSkill> skills = new ArrayList<>();
        CandidateSkill skill1 = new CandidateSkill();
        skill1.setSkill("Java");
        CandidateSkill skill2 = new CandidateSkill();
        skill2.setSkill("Springboot");
        skills.add(skill1);
        skills.add(skill2);
        candidate.setSkills(skills);

        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate));

        List<String> skillNames = candidateSkillService.getAllSkillsForCandidate(1);

        assertEquals(2, skillNames.size());
        assertEquals("Java", skillNames.get(0));
        assertEquals("Springboot", skillNames.get(1));

        verify(candidateRepository, times(1)).findById(1);
    }

    @Test
    public void testRemoveSkillFromCandidate() {
        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);
        List<CandidateSkill> skills = new ArrayList<>();
        CandidateSkill skill1 = new CandidateSkill();
        skill1.setSkill("Java");
        CandidateSkill skill2 = new CandidateSkill();
        skill2.setSkill("Springboot");
        skills.add(skill1);
        skills.add(skill2);
        candidate.setSkills(skills);

        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate));

        candidateSkillService.removeSkillFromCandidate(1, "Java");

        assertEquals(1, candidate.getSkills().size());
        assertEquals("Springboot", candidate.getSkills().get(0).getSkill());

        verify(candidateRepository, times(1)).findById(1);
        verify(candidateRepository, times(1)).save(any());
    }
}
