package com.exam.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")

public class Role {

	public Role(Long roleId, String roleNmae) {
		super();
		this.roleId = roleId;
		this.roleNmae = roleNmae;
	}
	public Role() {
		// TODO Auto-generated constructor stub
	}
	@Id
	private Long roleId;
	private String roleNmae;
	
@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "role")
	private Set<UserRole> userRole = new HashSet<>();
	
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public String getRoleNmae() {
		return roleNmae;
	}
	public void setRoleNmae(String roleNmae) {
		this.roleNmae = roleNmae;
	}
	
}
