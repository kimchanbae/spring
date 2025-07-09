package com.example.consumingrest.api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

	public List selectList();
	
}
