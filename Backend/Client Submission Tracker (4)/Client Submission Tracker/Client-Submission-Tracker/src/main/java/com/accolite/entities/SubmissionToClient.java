package com.accolite.entities;
import java.util.Date;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@AuditTable(value="audit_log")
@Table(name="submission_to_client")
//		uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "client_id", "candidate_id"}))
public class SubmissionToClient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="submission_id")
	@Audited
	private int submissionId;

	@Column(name="remark")
	@Audited
	private String remark;


	@Enumerated(EnumType.STRING)
	@Column(name="status")
	@Audited
	private Status status;

	@Column(name="submission_date")
	@Audited
	private Date submissionDate;


	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id",referencedColumnName = "user_id")
	@NotAudited
	private Users users;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="client_id",referencedColumnName = "client_id")
	@NotAudited
	private Client client;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="candidate_id",referencedColumnName = "candidate_id")
	@NotAudited
	private Candidate candidate;
	@Column(name="isdeleted")
	@NotAudited
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