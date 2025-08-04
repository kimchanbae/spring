package com.example.consumingrest.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.consumingrest.api.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping
	public List list(@RequestParam Map paramMap) {
		List<Map<String, Object>> list = userService.list(paramMap); 
		
		return list;
	}
	
	@PostMapping
	@ResponseBody
	public List postList(@RequestBody Map paramMap) {
		List<Map<String, Object>> list = userService.list(paramMap); 
		
		return list;
	}
	
	@PostMapping("/save")
	public Map<String, Object> save(@RequestBody Map paramMap) {
		Map<String, Object> resMap = new HashMap<>();
		
		try {
			userService.save(paramMap);
		} catch (Exception e) {
			// TODO: handle exception
			resMap.put("message", e.getMessage());
		}
		
		return resMap;
	}
	
	@ResponseBody
	@GetMapping("/view")
	public Map<String, Object> getView(@RequestParam Map paramMap) {
		Map<String, Object> map = userService.one(paramMap); 
		
		return map;
	}
	
	@PostMapping("/view")
	public Map<String, Object> postView(@RequestBody Map paramMap) {
		Map<String, Object> map = userService.one(paramMap); 
		
		return map;
	}
	
	@PostMapping("/delite")
	public void delite(@RequestBody Map paramMap) {
		userService.delite(paramMap);
	}
	
}
