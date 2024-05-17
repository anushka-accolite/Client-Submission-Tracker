package com.accolite.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum Status{
	ProfileSubmitted,
	InterviewScheduled,
	Selected,
	Rejected
	
}


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="submission_to_client")
public class SubmissionToClient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="submission_id")
	private int submissionId;
	
	
	@Column(name="remark")
	private String remark;
	
	
	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private Status status;
	
	@Column(name="submission_date")
	private Date submissionDate;
	
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id",referencedColumnName = "user_id")
	private Users users;
	
	@OneToOne(mappedBy="submission",fetch=FetchType.EAGER)
	private AuditLog auditLog;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="client_id",referencedColumnName = "client_id")
	private Client client;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="candidate_id",referencedColumnName = "candidate_id")
	private Candidate candidate;

	@Column(name="isdeleted")
	private Boolean isDeleted;
	

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Date getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}

	public int getSubmissionId() {
		return submissionId;
	}

	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	
	
	
}
