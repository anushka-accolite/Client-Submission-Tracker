package com.accolite.entities;

import java.util.List;

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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="candidate_skill")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateSkill {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="skill_id")
	private int skill_id;
	
	
	@Column(name="skill")
	private String skill;
	
	@Column(name="isdeleted")
	private Boolean isDeleted;
	
	
	@ManyToMany(mappedBy="skills",fetch=FetchType.EAGER,cascade = CascadeType.ALL)
	private List<Candidate> candidates;


	public String getSkill() {
		return skill;
	}


	public void setSkill(String skillName) {
		this.skill = skillName;
	}


	public int getSkill_id() {
		return skill_id;
	}


	public void setSkill_id(int skill_id) {
		this.skill_id = skill_id;
	}


	public Boolean getIsDeleted() {
		return isDeleted;
	}


	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}


//	public List<Candidate> getCandidates() {
//		return candidates;
//	}
//
//
//	public void setCandidates(List<Candidate> candidates) {
//		this.candidates = candidates;
//	}



	
	
	
}
