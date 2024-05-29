package com.accolite.entities;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "client")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="client_id")
	private int clientId;
	
	
	@Column(name="client_name")
	private String clientName;
	
	
	@Column(name="client_response_in_days")
	private int clientResponseTimeinDays;
	
	@Column(name="client_requirement")
	private String clientRequirement;
	
	@Column(name="skills")
	private String skills;
	
	@Column(name="isdeleted")
	private Boolean isDeleted;
	
	
	@ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
	@JoinTable(
			name="client_candidate",
			joinColumns = {
					@JoinColumn(name="client_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name="candidate_id")
			}
			)
	@JsonIgnore
	private List<Candidate> candidates;
	
	@OneToMany(mappedBy="client",fetch=FetchType.EAGER)
//	@JsonManagedReference
	private List<Users> users;
	
	@OneToMany(mappedBy="client",fetch=FetchType.EAGER)
	@JsonIgnore
	private List<SubmissionToClient> submissions;


	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public List<Candidate> getCandidates() {
		return candidates;
	}

	public void setCandidates(List<Candidate> candidates) {
		this.candidates = candidates;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public int getClientResponseTimeinDays() {
		return clientResponseTimeinDays;
	}

	public void setClientResponseTimeinDays(int clientResponseTimeinDays) {
		this.clientResponseTimeinDays = clientResponseTimeinDays;
	}

	public String getClientRequirement() {
		return clientRequirement;
	}

	public void setClientRequirement(String clientRequirement) {
		this.clientRequirement = clientRequirement;
	}

	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	
	
	
	
}
