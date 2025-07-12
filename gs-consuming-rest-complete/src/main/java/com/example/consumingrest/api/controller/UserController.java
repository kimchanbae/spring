package com.example.consumingrest.api.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.consumingrest.api.service.UserService;

@RestController
//@RequestMapping("/user")
@RequestMapping("/api/user")
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	
	@ResponseBody
	@GetMapping
	public List user() {
		log.debug("=============get 사용자 정보 조회============");
		
		List<Map<String, Object>> list = userService.selectList();
		
		return list;
	}
	
	@ResponseBody
	@PostMapping
	public List apiUser() {
		List<Map<String, Object>> list = new ArrayList<>();
		
		log.debug("list:" + list);
		
		return list;
	}
	
}
