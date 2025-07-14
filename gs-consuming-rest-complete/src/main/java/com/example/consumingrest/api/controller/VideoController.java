package com.example.consumingrest.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/video")
public class VideoController {

	
	@ResponseBody
	@GetMapping
	public List apiUser() {
		List<Map<String, Object>> list = new ArrayList<>();
		
		return list;
	}
	
}
