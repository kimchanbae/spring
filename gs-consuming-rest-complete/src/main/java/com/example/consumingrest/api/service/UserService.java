package com.example.consumingrest.api.service;

import java.util.HashMap;
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
	
	public void save(Map paramMap) throws Exception  {
		if(paramMap.get("mode").equals("create")) {
			Map user = userMapper.one(paramMap);
			
			if(user != null && !user.isEmpty()) {
				if(paramMap.containsValue(user.get("id"))) {
					throw new Exception("동일한 아이디가 존재합니다.");
				}
			}
			
			userMapper.insert(paramMap);
		}else {
			userMapper.update(paramMap);
		}
	}
	
	public void delite(Map paramMap) {
		userMapper.delite(paramMap);
	}
	
}
