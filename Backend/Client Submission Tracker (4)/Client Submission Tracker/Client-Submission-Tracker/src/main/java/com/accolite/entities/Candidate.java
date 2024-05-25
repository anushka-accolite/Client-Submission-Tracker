package com.accolite.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="candidate")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Candidate {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="candidate_id")
	private int candidateId;
	
	
	@Column(name="candidate_name")
	private String candidateName;
	
	
	@Column(name="candidate_email")
	private String candidateEmail;
	
	
	@Column(name="candidate_status")
	private String candidateStatus;
	
	
	@Column(name="last_working_day")
	private Date last_working_day;
	
	@Column(name="isEmployee")
	private String isAccoliteEmployee;
	
	@Column(name="experience")
	private int experience;
	
	@Column(name="isdeleted")
	private Boolean isDeleted;
	
	
	@ManyToMany(mappedBy = "candidates",cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
	private List<Client> clients;
	
	
	@ManyToMany(fetch=FetchType.EAGER,cascade = CascadeType.ALL)
	@JoinTable(
			name="candidate_skill_junction",
			joinColumns = {
					@JoinColumn(name="candidate_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name="skill_id")
			})
	private List<CandidateSkill> skills;
	
	@OneToMany(mappedBy="candidate",fetch=FetchType.EAGER)
	@JsonIgnore
	private List<SubmissionToClient> submissions;



	public List<CandidateSkill> getSkills() {
		return skills;
	}

	public void setSkills(List<CandidateSkill> skills) {
		this.skills = skills;
	}

//	public List<SubmissionToClient> getSubmissions() {
//		return submissions;
//	}
//
//	public void setSubmissions(List<SubmissionToClient> submissions) {
//		this.submissions = submissions;
//	}

	public int getCandidateId() {
		return candidateId;
	}

	public String getCandidateEmail() {
		return candidateEmail;
	}

	public void setCandidateEmail(String candidateEmail) {
		this.candidateEmail = candidateEmail;
	}

	public String getCandidateStatus() {
		return candidateStatus;
	}

	public void setCandidateStatus(String candidateStatus) {
		this.candidateStatus = candidateStatus;
	}

	public Date getLast_working_day() {
		return last_working_day;
	}

	public void setLast_working_day(Date last_working_day) {
		this.last_working_day = last_working_day;
	}

	public String getIsAccoliteEmployee() {
		return isAccoliteEmployee;
	}

	public void setIsAccoliteEmployee(String isAccoliteEmployee) {
		this.isAccoliteEmployee = isAccoliteEmployee;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public void setCandidateId(int candidateId) {
		this.candidateId = candidateId;
	}

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}
	
	
	
}
