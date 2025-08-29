package com.example.consumingrest.api.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.consumingrest.api.mapper.VideoMapper;

@Service
public class VideoService {

	@Autowired
	private VideoMapper videoMapper;
	
	
	public List list(Map paramMap) {
		return videoMapper.list(paramMap);
	}
	
}
