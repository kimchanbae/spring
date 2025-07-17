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
	
	public List selectList() {
		return userMapper.selectList();
	}
	
	public Map<String, Object> selectOne(Map paramMap) {
		return userMapper.selectOne(paramMap);
	}
	
	public void save(Map paramMap) {
		if(paramMap.get("mode").equals("create")) {
			userMapper.insert(paramMap);
		}else {
			userMapper.update(paramMap);
		}
	}
	
}
