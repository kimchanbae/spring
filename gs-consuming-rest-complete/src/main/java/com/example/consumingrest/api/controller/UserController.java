package com.example.consumingrest.api.controller;

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
	
	
	@ResponseBody
	@GetMapping
	public List list() {
		List<Map<String, Object>> list = userService.selectList(); 
		
		return list;
	}
	
	@PostMapping("/save")
	public void save(@RequestBody Map paramMap) {
		userService.save(paramMap);
	}
	
	@ResponseBody
	@GetMapping("/view")
	public Map<String, Object> getView(@RequestParam Map paramMap) {
		log.debug("==============사용자 정보 get 호출================");
		log.debug(paramMap.toString());
		
		Map<String, Object> map = userService.selectOne(paramMap); 
		
		return map;
	}
	
	@PostMapping("/view")
	public Map<String, Object> postView(@RequestBody Map paramMap) {
		log.debug("==============사용자 정보 post 호출================");
		log.debug(paramMap.toString());
		
		Map<String, Object> map = userService.selectOne(paramMap); 
		
		return map;
	}
	
	@PostMapping("/delite")
	public void delite(@RequestBody Map paramMap) {
		userService.delite(paramMap);
	}
	
}
