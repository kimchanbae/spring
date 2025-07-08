package com.example.consumingrest.api.controller;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

	private static final Logger log = LoggerFactory.getLogger(SampleController.class);
	
	@RequestMapping("sample")
	public List<String> sample() {
		return Arrays.asList("1111", "22222", "sampleTest~~~");
	}
	
}
