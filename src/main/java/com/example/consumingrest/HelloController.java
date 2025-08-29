package com.example.consumingrest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class HelloController {

	private static final Logger log = LoggerFactory.getLogger(HelloController.class);
	
	@GetMapping
	public String main() {
		log.debug("=========react main 시작===========");
		
		return "안녕하세요 hello 백엔드입니다.";
	}
	
	@ResponseBody
	@GetMapping("/hello")
	public List hello() {
		List<Map<String, Object>> contList = new ArrayList<>();
		
		Map<String, Object> content = new HashMap<>();
		content.put("id", "1");
		content.put("content", "안녕하세요 hello 백엔드입니다.");
		contList.add(0, content);
		
		Map<String, Object> content2 = new HashMap<>();
		content2.put("id", "2");
		content2.put("content", "안녕하세요 hello2 백엔드입니다.");
		contList.add(1, content2);
		
		log.debug("contList:" + contList);
		
		return contList;
	}
	
}
