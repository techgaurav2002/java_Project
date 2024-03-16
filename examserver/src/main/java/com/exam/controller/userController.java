package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.service.UserService;


@RequestMapping("/user")
@CrossOrigin("*")
@RestController

public class userController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//crating user 
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		
		user.setProfile("default.png");
		
		//encoading password with bcryptpasswordencoder
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		
		Set<UserRole> roles = new HashSet<>();
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleNmae("NORMAL");
		
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user,roles);
	}
	//user ko get kar sakte hai
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);
	}
	//delete the user by id
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId) {
		this.userService.deleteUser(userId);
	}
	//update api
	
	
//	@ExceptionHandler(AccountNotFoundException.class)
//	public ResponseEntity<?> exceptionHandler(AccountNotFoundException ex){
//		return ResponseEntity
//	}
	
	
	
	
	
	
	
}
