package com.accolite.entities;



import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="audit_log")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuditLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="auditlog_id")
	private int auditLogId;
	
	@Column(name="action")
	private String action;
	
	@Column(name="timestamp")
	private Date timestamp;
	
	
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="submission_id",referencedColumnName = "submission_id")
	private SubmissionToClient submission;
	
	@Column(name="isdeleted")
	private Boolean isDeleted;


	public int getAuditLogId() {
		return auditLogId;
	}


	public void setAuditLogId(int auditLogId) {
		this.auditLogId = auditLogId;
	}


	public String getAction() {
		return action;
	}


	public void setAction(String action) {
		this.action = action;
	}
	
	
	

}
