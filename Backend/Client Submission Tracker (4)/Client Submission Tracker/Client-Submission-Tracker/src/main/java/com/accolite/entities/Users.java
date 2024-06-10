package com.accolite.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


enum UserRole{
	TalentAcquistion,
    AccountManager,
	ProjectManager,
	admin
}

@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private int userId;
	
	
	@Column(name="user_name")
	private String userName;
	
	@Enumerated(EnumType.STRING)
	@Column(name="user_role")
	private UserRole userRole;
	
	@Column(name="user_email")
	private String email;
	
	
	@Column(name = "login_password")
	private String loginUserPassword;
	
	@Column(name="isdeleted")
	private Boolean isDeleted;

	@ManyToMany(mappedBy="users",fetch=FetchType.EAGER)
	@JsonIgnore
	private List<Client> clients;
	
	@OneToMany(mappedBy="users",fetch=FetchType.EAGER)
	@JsonIgnore
	private List<SubmissionToClient> submissions;

//	public List<SubmissionToClient> getSubmissions() {
//		return submissions;
//	}
//
//	public void setSubmissions(List<SubmissionToClient> submissions) {
//		this.submissions = submissions;
//	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public String getLoginUserPassword() {
		return loginUserPassword;
	}

	public void setLoginUserPassword(String loginUserPassword) {
		this.loginUserPassword = loginUserPassword;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	
	

}
