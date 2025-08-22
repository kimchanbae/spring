package com.example.consumingrest.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.consumingrest.common.mapper.FileMapper;


@Service
public class FileService {
	
	@Autowired
	private FileMapper fileMapper;
	
	public List list(Map paramMap) {
		return fileMapper.list(paramMap);
	}
	
	public Map<String, Object> one(Map paramMap) {
		return fileMapper.one(paramMap);
	}
	
//	public void insert(Map paramMap) {
	public Map<String, Object> insert(Map paramMap) {	
		 fileMapper.insert(paramMap);
		 
		 return paramMap;
	}
	
	public void delite(Map paramMap) {
		fileMapper.delite(paramMap);
	}
	
}
