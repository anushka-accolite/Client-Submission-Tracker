package com.accolite.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.accolite.entities.SubmissionToClient;
import com.accolite.repository.SubmissionRepository;

@ExtendWith(MockitoExtension.class)
public class SubmissionServiceTest {

    @Mock
    private SubmissionRepository submissionRepository;

    @InjectMocks
    private SubmissionService submissionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllSubmissions() {
        List<SubmissionToClient> submissions = new ArrayList<>();
        submissions.add(new SubmissionToClient());
        submissions.add(new SubmissionToClient());

        when(submissionRepository.findAll()).thenReturn(submissions);

        List<SubmissionToClient> result = submissionService.getAllSubmissions();

        assertEquals(submissions.size(), result.size());
        verify(submissionRepository, times(1)).findAll();
    }

    @Test
    public void testSubmitCandidateToClient() {
        SubmissionToClient submission = new SubmissionToClient();
        submission.setSubmissionId(1);

        when(submissionRepository.save(submission)).thenReturn(submission);

        SubmissionToClient result = submissionService.submitCandidateToClient(submission);

        assertEquals(submission, result);
        verify(submissionRepository, times(1)).save(submission);
    }

    @Test
    public void testGetSubmissionById() {
        SubmissionToClient submission = new SubmissionToClient();
        submission.setSubmissionId(1);

        when(submissionRepository.findById(1)).thenReturn(Optional.of(submission));

        SubmissionToClient result = submissionService.getSubmissionById(1);

        assertEquals(submission, result);
        verify(submissionRepository, times(1)).findById(1);
    }

    @Test
    public void testUpdateSubmissionStatus() {
        SubmissionToClient existingSubmission = new SubmissionToClient();
        existingSubmission.setSubmissionId(1);

        SubmissionToClient updatedSubmission = new SubmissionToClient();
        updatedSubmission.setSubmissionId(1);

        when(submissionRepository.save(updatedSubmission)).thenReturn(updatedSubmission);

        SubmissionToClient result = submissionService.updateSubmissionStatus(1, updatedSubmission);

        assertEquals(updatedSubmission, result);
    }

    @Test
    public void testDeleteSubmission() {
        Integer submissionId = 1;

        submissionService.deleteSubmission(submissionId);

        verify(submissionRepository, times(1)).deleteById(submissionId);
    }

    @Test
    public void testGetSubmissionsByUser() {
        Integer userId = 1;
        List<SubmissionToClient> submissions = new ArrayList<>();
        submissions.add(new SubmissionToClient());
        submissions.add(new SubmissionToClient());

        when(submissionRepository.findByUsers_UserId(userId)).thenReturn(submissions);

        List<SubmissionToClient> result = submissionService.getSubmissionsByUser(userId);

        assertEquals(submissions.size(), result.size());
        verify(submissionRepository, times(1)).findByUsers_UserId(userId);
    }



    @Test
    public void testIsCandidateAssociatedWithSubmission() {
        Integer candidateId = 1;
        List<Integer> submissionIds = new ArrayList<>();
        submissionIds.add(1);
        submissionIds.add(2);

        when(submissionRepository.findSubmissionIdsByCandidateId(candidateId)).thenReturn(submissionIds);

        List<Integer> result = submissionService.isCandidateAssociatedWithSubmission(candidateId);

        assertEquals(submissionIds.size(), result.size());
        verify(submissionRepository, times(1)).findSubmissionIdsByCandidateId(candidateId);
    }



}
