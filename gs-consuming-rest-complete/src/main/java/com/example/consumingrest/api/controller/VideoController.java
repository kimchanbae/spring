package com.example.consumingrest.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.consumingrest.api.service.VideoService;


@RestController
@RequestMapping("/api/video")
public class VideoController {

	@Autowired
	private VideoService videoService;
	
	
	@GetMapping
	public List list(@RequestParam Map paramMap) {
		List<Map<String, Object>> list = videoService.list(paramMap); 
		
		return list;
	}
	
	@PostMapping
	public List postList(@RequestBody Map paramMap) {
		List<Map<String, Object>> list = videoService.list(paramMap);
		
		return list;
	}
	
}
