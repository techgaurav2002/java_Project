package com.exam.service.impl;

import java.util.Set;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.helper.UserFoundException;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	//creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		User local = this.userRepository.findByUsername(user.getUsername());
		if(local != null) {
			System.out.print("User is already there");
			throw new AccountNotFoundException();
		}else {
			//user created
			for(UserRole ur:userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);
		}
		return local;
	}
	//getting user by user name
	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUsername(username);
	}
	@Override
	public void deleteUser(Long userid) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userid);
		
	}

}
