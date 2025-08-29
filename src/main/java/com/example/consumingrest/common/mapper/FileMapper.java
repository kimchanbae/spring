package com.example.consumingrest.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {

	public List list(Map paramMap);
	
	public List apiFileList(Map paramMap);
	
	public Map<String, Object> one(Map paramMap);
	
	public void insert(Map paramMap);
	
	public void delete(String name);
	
}
