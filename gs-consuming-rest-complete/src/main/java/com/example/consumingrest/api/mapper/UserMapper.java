package com.example.consumingrest.api.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

	public List selectList();
	
	public Map<String, Object> selectOne(Map paramMap);
	
	public void insert(Map paramMap);
	
	public void update(Map paramMap);
	
}
