package com.example.consumingrest.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.consumingrest.api.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@ResponseBody
	@RequestMapping("user")
	public List user() {
		List<Map<String, Object>> list = new ArrayList<>();
		
		log.debug("===========사용자===============");
		
		log.debug("===========" + userService.selectList());
		
		return userService.selectList();
//		return list;
	}
	
}
