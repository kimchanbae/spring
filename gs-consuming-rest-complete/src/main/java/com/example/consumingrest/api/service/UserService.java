package com.example.consumingrest.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.consumingrest.api.mapper.UserMapper;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	public List list(Map paramMap) {
		return userMapper.list(paramMap);
	}
	
	public Map<String, Object> one(Map paramMap) {
		return userMapper.one(paramMap);
	}
	
	public void save(Map paramMap) {
		if(paramMap.get("mode").equals("create")) {
			userMapper.insert(paramMap);
		}else {
			userMapper.update(paramMap);
		}
	}
	
	public void delite(Map paramMap) {
		userMapper.delite(paramMap);
	}
	
}
