package com.example.consumingrest;

import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
	
	private final AtomicLong counter = new AtomicLong();
	private static final Logger log = LoggerFactory.getLogger(GreetingController.class);
	
//	@GetMapping("/index")
//	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
//		return new Greeting(counter.incrementAndGet(), String.format("hello spring ", name));
//	}
	
//	@GetMapping("/api/test")
//	public String hello() {
//		log.debug("=============/api/test============");
//		
//		return "안녕하세요 백엔드입니다.";
//	}
	
}
